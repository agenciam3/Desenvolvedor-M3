import styled from "styled-components";


export const FooterContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: black;
    color: white;
    margin-top: 150px;    
    display: flex;
    left: 0;
    text-align: center;
    @media only screen and (max-width: 1024px){
        position: relative;
        p {
            font-size: 10px;
            padding: 2px;
        }
        margin-top: 80px;
        
    }

`;