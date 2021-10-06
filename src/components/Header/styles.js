import styled from "styled-components";

export const HeaderContainer = styled.div`
background: white;
width: 100%;
display: flex;
z-index:2;
border-bottom: 1px solid gray;
@media only screen and (min-width: 1025px){
  top: 0px;
  position: fixed;
  height: 81px;
}
@media only screen and (max-width: 1024px){
  height: 40px;
}
`;

export const HeaderLoginRow = styled.div`
max-width: 100%;
width: 100%;
display: grid;
grid-auto-flow: column;
`;

export const HeaderBagRow = styled.div`
max-width: 100%;
width: 100%;
justify-content: center;
display: grid;
grid-auto-flow: column;
margin-left: 40%;
`;