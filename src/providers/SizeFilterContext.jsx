import React from 'react';
import { useState } from 'react';

export const SizeFilterContext = React.createContext();

export const SizeFilterProvider = (props) => {
    const [sizes,  setSizes] = useState(["P","M","G","GG","U","36","38","40","42","44","46"]);
    
    return (
        <SizeFilterContext.Provider value={{ sizes, setSizes }}>
            {props.children}
        </SizeFilterContext.Provider>
    );
};

export const useSizeFilter = () => React.useContext(SizeFilterContext);