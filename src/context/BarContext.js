import React, { useContext, useState, useEffect } from "react";
import { retrieveAlbums, retrievePhotos, retrieveUsers } from "../services";

export const BarContext = React.createContext()

export function useBarContext() {
    return useContext(BarContext)
}

export function BarProvider({ children }) {
    /**
     * Need 2 sets of bar data 
     * 1. barData will be used as the original state (never changes)
     * 2. filteredBarData will be used for when the user selects albums to filter out
     */

    const [isLoading, setIsLoading] = useState(true);
    const [barData, setBarData] = useState([]);
    const [filteredBarData, setFilteredBarData] = useState([]);
    const [keys, setKeys] = useState([]);
    const [filteredKeys, setFilteredKeys] = useState([]);
    const [selectedOption, setSelectedOption] = useState([]);

    const fetchAndSetData = async () => {
        const users = await retrieveUsers()
        const albums = await retrieveAlbums(users);
        const albumCache = await retrievePhotos(albums);
        
        const tempKeys = [];
        
        // This loops through the fetched users and albums
        // Matches each user with their albums
        const tempAlbums = users.map(user => {
            let tempUser = {};
            tempUser['user'] = user.email.split('@')[0]
            albums.forEach(album => {
                if (album.userId === user.id) {
                    tempUser[album.title] = albumCache[album.id]
                }
            })
            return tempUser
        })

        // Used for keys needed in the bar chart
        // Loops through albums and returns an array of album titles
        albums.forEach((album) => {
            tempKeys.push(album.title)
        })

        setBarData(tempAlbums)
        setFilteredBarData(tempAlbums)
        setKeys(tempKeys)
        setFilteredKeys(tempKeys)
        setIsLoading(false)
    }
    useEffect(() => {
        // Will only be called once
        fetchAndSetData()
    }, [])

    useEffect(() => {
        // Will be called with every change in selectedOption
        filterAlbums()
    }, [selectedOption])

    const filterAlbums = () => {
        // If selectedOption is empty we can set filteredBarData back to the original state
        if (selectedOption.length === 0) {
            setFilteredBarData(barData);
            setFilteredKeys(keys);
            return null
        }
        
        // Created an array of titles similar to keys
        // Useful for finding the difference between keys and selectedOptionsArray
        const selectedOptionsArray = selectedOption.map(option => {
            return option.value
        })

        // Looping through barData to compare each object and delete any that matches
        const filteredArr = barData.map(user => {
            let tempUser = { ...user }
            selectedOptionsArray.forEach(option => {
                if (tempUser[option] !== undefined) {
                    delete tempUser[option];
                }
            })
            return tempUser
        })

        // Finds the difference between keys and selectedOptionsArray
        const filteredKeysArr = keys.filter(keys => !selectedOptionsArray.includes(keys));

        setFilteredBarData(filteredArr);
        setFilteredKeys(filteredKeysArr)
    }
    return (
        <BarContext.Provider value={{
            data: filteredBarData,
            keys: filteredKeys,
            isLoading,
            setSelectedOption
        }}>
            {children}
        </BarContext.Provider>
    )
}