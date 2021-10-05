import React, { useState } from 'react';
import { CardsOrdersContext, useCardsOrders } from '../../../providers/CardsOrdersContext';
import { DropdownLine, DropdownContainer, DropdownOptions } from './styles';

const Dropdown = () => {
    const { setCardsOrder } = useCardsOrders(CardsOrdersContext);
    const [ isOpen, setIsOpen ] = useState(false);

    const handleClickSelect = (e) => {
        if(e.target.value==="orderId")
            setCardsOrder(e.target.value);
        

        else if(e.target.value==="orderDecreasingPrice")
            setCardsOrder(e.target.value);
        
        else
            setCardsOrder(e.target.value);
        
    }
    return (
        <DropdownLine>
            <DropdownContainer>
            <button onClick={()=>{setIsOpen(!isOpen)}} defaultValue="default"> Ordenar por:</button>
            {isOpen ?
            <DropdownOptions>
                <button onClick={handleClickSelect} value="orderId" className="visible-option">Mais recentes</button>
                <button onClick={handleClickSelect} value="orderDecreasingPrice" className="visible-option">Menor preço</button>
                <button onClick={handleClickSelect} value="orderIncreasingPrice" className="visible-option">Maior preço</button>
            </DropdownOptions>
            :
            <></>
            }   
            </DropdownContainer>
        </DropdownLine>
    );
}
 
export default Dropdown;