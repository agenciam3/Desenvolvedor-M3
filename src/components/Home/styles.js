import styled from "styled-components";

export const HomeContainer = styled.div`
@media only screen and (min-width: 800px){
    top: 80px;
    position: relative;
    max-width: 100%;
    width: 100%;
    height: auto;
    display: flex;
}
    
@media only screen and (max-width: 800px){
    width: 100%;
    height: 100%;
    position: relative;

}
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
    width: 100%;
    height: 20%;
    max-height: 100px;
    margin-top: 20px;

`;

export const MobileButton = styled.button`
    width: 50%;
    height: 100%;
    border: 1px solid gray;
    p {
        font-size: 20px;
        color: gray;
    }
`;
