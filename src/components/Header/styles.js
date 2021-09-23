import styled from "styled-components";

export const HeaderContainer = styled.div`
@media only screen and (min-width: 800px){
  width: 100%;
  position: fixed;
  height: 81px;
  background: white;
  top: 0px;
  align-items: center;
  border-bottom: 1px solid gray;
  z-index:2;
  display: flex;
}
  @media only screen and (max-width: 800px){
    width: 100%;
    display: flex;
    height: 5%;
    border-bottom: 1px solid gray;
    background: white;
  }
`;


