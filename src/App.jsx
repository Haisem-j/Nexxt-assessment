import React from 'react';

import MainContainer from './components/MainContainer';
import { BarProvider } from './context/BarContext';

const App = () => {
    return (
        <BarProvider>
            <div className="appContainer">
                <MainContainer />
            </div>
        </BarProvider>
    )
}

export default App;