import React from 'react';
import { useState } from 'react';

export const MobilePagesContext = React.createContext();

export const MobilePagesProvider = (props) => {
    const [mobilePages,  setMobilePages] = useState([0,0]);
    
   
    return (
        <MobilePagesContext.Provider value={{ mobilePages, setMobilePages }}>
            {props.children}
        </MobilePagesContext.Provider>
    );
};

export const useMobilePages = () => React.useContext(MobilePagesContext);