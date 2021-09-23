import styled from "styled-components";

export const DropdownLine = styled.div`
    width: 90%;
    position: absolute;
    
`;

export const DropdownContainer = styled.div`
    position: relative;
    right: 50px;
    display: block;
    max-width: 120px;
    float: right;
    margin-top: 15px;
    button{
        padding: 10px;
        width: 125px;
        border: 1px solid black;
        .invisible-option {
            display:none;
        }
    }


`;
export const DropdownOptions = styled.div`
    width: 80px;
    position: relative;
    margin-top: 1px;   
    z-index: 10;
    button{
        background-color: white;
        border: none;
        width: 125px;
        padding: 10px;
        &:hover{
            background-color: #13DAD4;
        }
    }
`;
export const ShelfContainer = styled.div`

@media only screen and (min-width: 800px){
    width: 800px;
}
    
    top: 60px;
    heigth: 100%;
    display: flex;
    flex-wrap: wrap;
    position: relative;

    @media only screen and (max-width: 800px){
        width: 100%;
    }
    
`;

export const LoadButton = styled.button`

    position: relative;
    display: block;
    cursor: pointer;
    color: white;
    background-color: #13DAD4;
    max-height: 40px;
    padding: 10px;

@media only screen and (min-width: 800px){
    
    margin-left: 320px;
    
    font-size: 15px;
    border: none;
    margin-bottom: 30px;
}
@media only screen and (max-width: 800px){
    margin-bottom: 15px;
    margin-left: 35%;
    margin-top: 20px;
}
`;

export const CardContainer = styled.div`

@media only screen and (min-width: 800px){
    width: 800px;
    position: relative;
    width: 800px;
    max-heigth: 100%;
    display: flex;
    flex-wrap: wrap;
    div {
        display: block;
        margin: 30px;
        text-align: center;
        button {
            width: 100%;
            background-color: black;
            padding-top: 10px;
            padding-bottom: 10px;
            color: white;
            font-size: 15px;
            cursor: pointer;
            border: none;
        }
    }
}
      
    @media only screen and (max-width: 800px){
    position: relative;
    width: 100%;
    max-heigth: 100%;
    display: flex;
    flex-wrap: wrap;
    div {
        h2 {
            font-size: 14px;
        }
        width: 50%;
        text-align: center;
        button {
            width: 90%;
            background-color: black;
            padding-top: 5px;
            padding-bottom: 5px;
            color: white;
            font-size: 15px;
            cursor: pointer;
            border: none;
        }
    }

`;

