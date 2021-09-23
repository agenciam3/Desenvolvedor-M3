import styled from "styled-components";


export const FooterContainer = styled.div`
    width: 100%;
    p {
        margin-left: 600px;
        color: white;
        padding: 2px;
    }
    background-color: black;
    margin-top: 150px;    
    display: flex;
    left: 0;
    text-align: center;
    @media only screen and (max-width: 800px){
        position: relative;
        p {
            font-size: 8px;
            margin-left: 30%;
            padding: 2px;
        }
        margin-top: 80px;
        
    }

`;