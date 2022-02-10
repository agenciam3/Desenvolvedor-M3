import styled from 'styled-components';

export const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
`;

export const CloseArea = styled.div`
  background: rgba(0, 0, 0, 0.5);
  height: 100vh;
  flex: 1;
  cursor: pointer;
`;

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  width: 100%;
  max-width: 450px;
  height: 100%;
  border-radius: 4px;
  padding: 24px;
  text-align: center;
  overflow-y: auto;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
`;

export const CloseButton = styled.div`
  width: calc(450px - 24px);
  background: #fff;
  position: fixed;
  right: 24px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  img {
    margin: 8px 0 8px;
    cursor: pointer;
  }
`;

export const ProductContainer = styled.div`
  border-bottom: 1px solid lightgray;
  padding: 24px 0;

  img {
    width: 100px;
  }

  h4 {
    padding: 4px 0;
  }
`;

export const ProductQuantity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > p {
    padding: 0 8px;
  }

  & > button {
    font-size: 20px;
    background: transparent;
    border-color: transparent;
    padding: 0 8px;
  }
`;

export const RemoveProduct = styled.button`
  background: ${({ theme }) => theme.colors.button};
  border-color: ${({ theme }) => theme.colors.button};
  color: #fff;
  padding: 4px;
  margin-top: 8px;
  font-weight: bold;
`;
