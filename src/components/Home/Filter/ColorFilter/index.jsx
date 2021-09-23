import React, { useState } from 'react';
import { ColorFilterContext, useColorFilter } from '../../../../providers/ColorFilterContext';
const ColorFilter = () => {
    const { colors, setColors } = useColorFilter(ColorFilterContext)
    const [isOpen, setIsOpen] = useState(false);
    const saveInitialColors = ["Amarelo","Azul","Branco","Cinza","Laranja","Verde","Vermelho","Preto","Rosa","Vinho"];
    
    const handleClick = () => {
        setIsOpen(!isOpen);

    }

    const changeClass = (e) => {
        if(!e.target.className)
            e.target.className = "activeInput"; 
        else
            e.target.className = "";
    }

    const handleClickColor = (e) => {
        if(!e.target.className){
            if(JSON.stringify(colors)===JSON.stringify(saveInitialColors))
                setColors(colors.filter(color => color === e.target.value));
            else
                setColors(colors => [...colors, e.target.value]);
        }
        else{
            if(colors.length===1)
                setColors(saveInitialColors);
            else
                setColors(colors.filter(color => color !== e.target.value));
        }
        
        changeClass(e);
    };

    return (  
        <>   
            {isOpen ?
                <>
                    <li className="color"><input type="checkbox" value="Amarelo" onClick={handleClickColor} />Amarelo</li>
                    <li className="color"><input type="checkbox" value="Azul" onClick={handleClickColor} />Azul</li>
                    <li className="color"><input type="checkbox" value="Branco" onClick={handleClickColor} />Branco</li>
                    <li className="color"><input type="checkbox" value="Cinza" onClick={handleClickColor} />Cinza</li>
                    <li className="color"><input type="checkbox" value="Laranja" onClick={handleClickColor} />Laranja</li>
                    <li className="color"><input type="checkbox" value="Verde"onClick={handleClickColor} />Verde</li>
                    <li className="color"><input type="checkbox" value="Vermelho" onClick={handleClickColor} />Vermelho</li>
                    <li className="color"><input type="checkbox" value="Preto" onClick={handleClickColor} />Preto</li>
                    <li className="color"><input type="checkbox" value="Rosa" onClick={handleClickColor} />Rosa</li>
                    <li className="color"><input type="checkbox" value="Vinho" onClick={handleClickColor} />Vinho</li>
                    <p className="trigger" onClick={handleClick}><u>Ver menos cores</u></p>
                </>
            :
                <>
                    <li className="color"><input type="checkbox" value="Amarelo" onClick={handleClickColor} />Amarelo</li>
                    <li className="color"><input type="checkbox" value="Azul" onClick={handleClickColor} />Azul</li>
                    <li className="color"><input type="checkbox" value="Branco" onClick={handleClickColor} />Branco</li>
                    <li className="color"><input type="checkbox" value="Cinza" onClick={handleClickColor} />Cinza</li>
                    <li className="color"><input type="checkbox" value="Laranja" onClick={handleClickColor} />Laranja</li>
                    <li className="color-hidden"><input type="checkbox" value="Verde" onClick={handleClickColor} />Verde</li>
                    <li className="color-hidden"><input type="checkbox" value="Vermelho" onClick={handleClickColor} />Vermelho</li>
                    <li className="color-hidden"><input type="checkbox" value="Preto" onClick={handleClickColor} />Preto</li>
                    <li className="color-hidden"><input type="checkbox" value="Rosa" onClick={handleClickColor} />Rosa</li>
                    <li className="color-hidden"><input type="checkbox" value="Vinho" onClick={handleClickColor} />Vinho</li>
                    <p className="trigger" onClick={handleClick}><u>Ver todas as cores</u></p>
                </>
            }     
        </>
    );
};   
 
export default ColorFilter;