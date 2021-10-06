import React from 'react';
import { useState } from 'react';

export const ColorFilterContext = React.createContext();

export const ColorFilterProvider = (props) => {
    const [colors,  setColors] = useState(["Amarelo","Azul","Branco","Cinza","Laranja","Verde","Vermelho","Preto","Rosa","Vinho"]);
    
   
    return (
        <ColorFilterContext.Provider value={{ colors, setColors }}>
            {props.children}
        </ColorFilterContext.Provider>
    );
};

export const useColorFilter = () => React.useContext(ColorFilterContext);