import React from 'react';
import { useState } from 'react';

export const PriceFilterContext = React.createContext();

export const PriceFilterProvider = (props) => {
    const [prices,  setPrices] = useState(["0", "1", "2", "3", "4"]);
    
    return (
        <PriceFilterContext.Provider value={{ prices, setPrices }}>
            {props.children}
        </PriceFilterContext.Provider>
    );
};

export const usePriceFilter = () => React.useContext(PriceFilterContext);