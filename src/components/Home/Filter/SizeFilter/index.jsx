import React from 'react';
import { SizeFilterContext, useSizeFilter } from '../../../../providers/SizeFilterContext';

const SizeFilter = () => {
    const { sizes, setSizes } = useSizeFilter(SizeFilterContext);
    const saveInitialSizes = ["P","M","G","GG","U","36","38","40","42","44","46"];
    const changeClass = (e) => {
        if(!e.target.className)
            e.target.className = "activeButton"; 
        else
            e.target.className = "";
    }

    const handleClick = (e) => {
        
        if(!e.target.className){
            if(JSON.stringify(sizes)===JSON.stringify(saveInitialSizes))
                setSizes(sizes.filter(size => size == e.target.value));
            else
                setSizes(sizes => [...sizes, e.target.value]);
        }
        else{
            if(sizes.length==1)
                setSizes(saveInitialSizes);
            else
                setSizes(sizes.filter(size => size != e.target.value));
        }
        
        changeClass(e);
    };
    return (
        <>
            <button onClick={handleClick} value="P">P</button>
            <button onClick={handleClick} value="M">M</button>
            <button onClick={handleClick} value="G">G</button>
            <button onClick={handleClick} value="GG">GG</button>
            <button onClick={handleClick} value="U">U</button>
            <button onClick={handleClick} value="36">36</button>
            <button onClick={handleClick} value="38">38</button>
            <button onClick={handleClick} value="40">40</button>
            <button onClick={handleClick} value="42">42</button>
            <button onClick={handleClick} value="44">44</button> 
            <button onClick={handleClick} value="46">46</button>   
        </>
    );
};
    
    export default SizeFilter;