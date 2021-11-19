import React from 'react';

import Header from '../Header';
import ChartContainer from '../ChartContainer';
import Loading from '../Loading'
import { useBarContext } from '../../context/BarContext';

import './mainContainer.css'

const MainContainer = () => {
    const { isLoading, data, keys } = useBarContext();
    return isLoading ? (
        <div className="mainContainer flex">
            <Loading />
        </div>
    ) :
        (
            <div className="mainContainer">
                <Header />
                <ChartContainer data={data} keys={keys} />
            </div>
        )

}

export default MainContainer;