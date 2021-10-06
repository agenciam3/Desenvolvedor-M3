import React from 'react';
import { PriceFilterContext, usePriceFilter } from '../../../../providers/PriceFilterContext';
const PriceFilter = () => {
    const {prices, setPrices } = usePriceFilter(PriceFilterContext);
    const saveInitialPrices = ["0","1","2","3","4"];
    
    const changeClass = (e) => {
        if(!e.target.className)
            e.target.className = "activeInput"; 
        else
            e.target.className = "";
    }

    const handleClick = (e) => {
        if(!e.target.className){
            if(JSON.stringify(prices)===JSON.stringify(saveInitialPrices))
                setPrices(prices.filter(price => price === e.target.value));
            else
                setPrices(prices => [...prices, e.target.value]);
        }
        else{
            if(prices.length===1)
                setPrices(saveInitialPrices);
            else
                setPrices(prices.filter(price => price !== e.target.value));
        }
        console.log(prices);
        
        changeClass(e);
    };

    return (  
        <>   
            <li><input type="checkbox" onClick={handleClick} value="0" />de R$0 até R$50</li>
            <li><input type="checkbox" onClick={handleClick} value="1" />de R$51 até R$150</li>
            <li><input type="checkbox" onClick={handleClick} value="2" />de R$151 até R$300</li>
            <li><input type="checkbox" onClick={handleClick} value="3" />de R$301 até R$500</li>
            <li><input type="checkbox" onClick={handleClick} value="4" />a partir de R$ 01</li>  
        </>
    );
};   
 
export default PriceFilter;

