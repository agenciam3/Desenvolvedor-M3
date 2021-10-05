import styled from "styled-components";

export const Page = styled.div`
    height: 100%;
    width: 100%;
    background-color: white;
    z-index: 11;
    ${({ state }) => {
        console.log(state);
        if(state===0)
            return `display: none;`;
        else
            return  `display: block;`;
    }}
`;

export const HeaderContainer = styled.div`
    width: 100%;
    height: 60px;
    border-bottom: 1px solid gray;
    display: flex;
    justify-content: space-between;
`;

export const HeaderTitle = styled.div`
    width: auto;
    height: auto; 
    position: relative;
    display: flex;
    margin-left: 15px;
    bottom: 10px;
    p {
        font-size: 25px;
        color: gray;
        width: auto;
        display: flex;
    } 
`;

export const CloseButtonContainer = styled.div`
   font-size: 40px;
   margin-right: 5%;
   max-height: 35px;
   margin-top: 2%;
   height: auto;
`;

export const FinalButtonsContainer = styled.div`
   width: 100%;
   max-height: 30%;
   margin-top: 10%;
   display: flex;
   justify-content: center;
   ${({ colorIsOpen, sizeIsOpen, priceIsOpen }) => {
    if(colorIsOpen||sizeIsOpen||priceIsOpen)
        return `display: flex;`;
    else
        return  `display: none;`;   
    }}

`;

export const ApplyButton = styled.button`
   font-size: 20px;
   width: 40%;
   max-width: 150px;
   padding: 15px;
   background-color: white;
   color: black;
   margin-right: 5%;
   border: 1px solid black;
   &:active{
    background-color: #13DAD4; 
    color: white;
    border: none;
}
   
`;

export const ClearButton = styled.button`
   font-size: 20px;
   padding: 15px;
   width: 40%;
   max-width: 150px;
   border: 1px solid black;
   &:active{
       background-color: #13DAD4; 
       color: white;
       border: none;
   }
`;

export const OrderContainer = styled.div`
   width: 100%;
   height: auto;
   margin-top: 10%;
`;

export const OrderTitleContainer = styled.button`
   width: 90%;
   height: auto;
   margin-left: 5%;
   margin-bottom: 10%;
   font-size: 20px;
   text-align: left;
`;