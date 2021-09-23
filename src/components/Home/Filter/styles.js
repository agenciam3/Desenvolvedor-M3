import styled from "styled-components";

export const MainContainer = styled.div`
    width: 180px;
    height: 80%;
    margin-left: 150px;
    background-color: white;
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
        display:none;
    };

    .trigger{
        color: gray;
        cursor: pointer;
    };

    button{
        background-color: white;
        border:  1px solid;
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

@media (max-width: 800px){
    width: 180px;
    height: 80%;
    margin-left: 150px;
    background-color: white;
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
        display:none;
    };

    .trigger{
        color: gray;
        cursor: pointer;
    };

    button{
        background-color: white;
        border:  1px solid;
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
`;

export const ColorContainer = styled.div`
@media (min-width: 768px){
    width: auto;
    height: auto;
}
`;

export const SizeContainer = styled.div`
    width: auto;
    height: auto;
`;

export const PriceContainer = styled.div`
@media (min-width: 768px){
    width: auto;
    height: auto;
}
`;
