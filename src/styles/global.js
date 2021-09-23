import { createGlobalStyle } from "styled-components";

export default createGlobalStyle` 
    
* {
    box-sizing: border-box;
}

body {
    width: 100%;
    height: 100%;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
    background: white;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    font-family: 'Nunito', sans-serif;
    display: flex;
    flex-direction: column;
}

 button {
    outline: none;
    border: none;
    background: none;
}


`;
