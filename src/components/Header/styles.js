import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
  padding: 0 128px;
  border-bottom: 2px solid lightgray;

  @media (max-width: 900px) {
    padding: 0 24px;
  }
`;

export const Logo = styled.img`
  cursor: pointer;
`;

export const Cart = styled.div`
  cursor: pointer;

  span {
    background: #24D0FF;
    color: #fff;
    font-size: 14px;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 32.5px;
    right: 120px;

    @media (max-width: 900px) {
      right: 16px;
    }
  }
`;
