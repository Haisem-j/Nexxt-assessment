import React from 'react';
import Select from 'react-select';

import { useBarContext } from '../../context/BarContext';
import './header.css'

const Header = () => {
    const { keys, setSelectedOption } = useBarContext()

    const formatKeys= () =>{
        // Will return keys with a length of 30 if more it will add ... at the end
        return keys.map(key => {
            return {
                label: key.length > 30 ? key.slice(0,30) + '...' : key,
                value: key
            }
        })
    }
    return (
        <div className="header">
            <div className="header-title">
                Photos Per Person
            </div>
            <div className="header-filter">
                <span>FILTER OUT</span>
                <Select options={formatKeys()} isMulti className="select-filter" onChange={setSelectedOption}/>
            </div>
        </div>
    )
}

export default Header;
