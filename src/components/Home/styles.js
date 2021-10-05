import styled from "styled-components";

export const HomeContainer = styled.div`
width: 100%;
position: relative;
height: 100%;
@media only screen and (min-width: 1025px){
    top: 80px;
    display: flex;
}
min-height: 100vh;
`;

//Mobile

export const  TitleContainer = styled.div`
    width: 100%;
    text-align: center; 
    max-height: 5%;
    h1 {
        font-size: 35px;    
    };
`;

export const MobileButtonsContainer = styled.div`
    position: relative;
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    max-height: 100px;
    margin-top: 20px;

`;

export const MobileFilterButton = styled.button`
    width: 50%;
    padding: 0;
    min-height: 70px;
    border: 1px solid gray;
    font-size: 20px;
    color: gray;
    
`;

export const MobileOrderButton = styled.button`
    width: 50%;
    min-height: 70px;
    padding: 0;
    border: 1px solid gray;
    font-size: 20px;
    color: gray;
`;