import React from 'react';
import { useState } from 'react';

export const CardsOrdersContext = React.createContext();

export const CardsOrdersProvider = (props) => {
    const [cardsOrder,  setCardsOrder] = useState("orderId");
    
   
    return (
        <CardsOrdersContext.Provider value={{ cardsOrder, setCardsOrder }}>
            {props.children}
        </CardsOrdersContext.Provider>
    );
};

export const useCardsOrders = () => React.useContext(CardsOrdersContext);