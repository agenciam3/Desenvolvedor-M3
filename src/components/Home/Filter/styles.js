import styled from "styled-components";

export const MainContainer = styled.div`
@media (min-width: 1025px){
    width: 15%;
    height: 80%;
    margin-left: 125px;
    background-color: white;
    font-size: 15px;
    .title{
        color: black;
    };
    .subtitle{
        padding-top: 30px;
        color: black;
    };
    li{
        list-style-type: none;
    };
    .color-hidden{
        display: none;
    };
    .trigger{
        color: gray;
        cursor: pointer;
    };
    input {
        margin-right: 3%;
    }
    button{
        background-color: white;
        border: 1px solid;
        color: black;
        width: 35px;
        height: 35px;
        margin: 3px;
        opacity: 0.3;
    };
    .activeButton{
        opacity: 1;
        border-color:#13DAD4;
    }
}
@media (max-width: 1024px){
    position: relative;
    width: 100%;
    height: 100%;
    background-color: white;
    li{
        list-style-type: none;
        font-size: 15px;
        margin-bottom: 3%;
        height: 150%;
    };
    input {
        padding: 15%;
        margin-right: 3%;
    }
      
    button{
        background-color: white;
        border:  1px solid;
        color: black;
        padding: 5%;
        min-width: 15%;
        margin-left: 4%;
        margin-right: 4%;
        margin-bottom: 5%;
        opacity: 0.3;
    };
    .activeButton{
        opacity: 1;
        border-color:#13DAD4;
    }
}
`;

export const ColorContainer = styled.div`
    height: auto;
    @media (min-width: 1025px){
        width: auto;
    }
    @media (max-width: 1024px){
        width: 100%;
        margin-top: 25px;
    }
        
`;

export const SizeContainer = styled.div`
    height: auto;
    @media (min-width: 1025px){
        width: auto;
    }
    @media (max-width: 1024px){
        width: 100%;
        margin-top: 50px;
        flex-wrap: wrap;
    }
`;

export const PriceContainer = styled.div`
    height: auto;
    @media (min-width: 1025px){
        width: auto;
    }
    @media (max-width: 1024px){
        width: 100%;
        margin-top: 50px;
    }
`;

export const TitleContainer = styled.div`
    position: relative;
    height: auto;
    max-height: 20%;
    width: 100%;
    display: flex;
    align-items: center; 
    justify-content: space-between;
`;

export const TitleTextContainer = styled.div`
    position: relative;
    margin-left: 5%;
`;

export const TitleButtonContainer = styled.div`
    position: relative;
    margin-right: 5%;
    button{
        border: none;
        color: black;
    }
`;

export const ContentContainer = styled.div`
    margin-left: 10%;
    margin-right: 10%;
`;
