import { MAIN_API } from "./utils"

export const retrieveUsers = async () => {
    try {
        let response = await fetch(`${MAIN_API}users`)
        let result = await response.json()

        /**
         *  Shuffle Array and return 7 randomly selected users
         * {
         *   id,
         *   email
         * }
         * */ 

        const shuffledArray = result.sort((a, b) => 0.5 - Math.random());
        return shuffledArray.slice(0,7).map(user =>{
            return {
                id: user.id,
                email: user.email
            }
        })

    } catch (error) {
        let result = {
            success: false,
            msg: "Something went wrong when fetching users....",
            error: error
        };
        return result
    }
}
export const retrieveAlbums = async (users) => {
    try {
        let response = await fetch(`${MAIN_API}albums`)
        let albums = await response.json()
        
        /**
         * Using the fetched users, this will filter through the albums that only have the userIds that were provided in users.
         */
        const filteredAlbums = albums.filter(e => {
            return users.some(user => user.id === e.userId);
        });
        return filteredAlbums;

    } catch (error) {
        let result = {
            success: false,
            msg: "Something went wrong when fetching albums....",
            error: error
        };
        return result
    }
}
export const retrievePhotos = async (albums) => {
    try {
        let response = await fetch(`${MAIN_API}photos`)
        let photos = await response.json()
        let albumCache = {}
        
        albums.forEach(album =>{
            albumCache[album.id] = 0;
        })

        photos.forEach(photo =>{
            if(albumCache[photo.albumId] !== undefined){
                albumCache[photo.albumId] = albumCache[photo.albumId] + 1;
            }
        })

        /**
         * Only need id and album id. Filtering this out before returning
         * {
         *   id,
         *   albumId
         * }
         */

        return albumCache
    } catch (error) {
        let result = {
            success: false,
            msg: "Something went wrong when fetching photos....",
            error: error
        };
        return result
    }
}