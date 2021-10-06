import React from 'react';
import { useState, useEffect } from 'react';

export const BagCounterContext = React.createContext();

export const BagCounterProvider = (props) => {
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        const counterStorage = localStorage.getItem("counter");
            if(counterStorage)
                setCounter(JSON.parse(counterStorage));
            
            console.log(counter);
        
      }, []);
    
    return (
        <BagCounterContext.Provider value={{ counter, setCounter }}>
            {props.children}
        </BagCounterContext.Provider>
    );
 
};

export const useBagCounter = () => React.useContext(BagCounterContext);