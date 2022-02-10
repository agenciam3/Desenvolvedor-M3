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

export const Container = styled.div`
  background: ${({ theme }) => theme.colors.background};
  width: 100%;
  height: 100%;
  border-radius: 4px;
  text-align: center;
  overflow-y: auto;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
`;

export const OrderByOpen = styled.div`
  text-align: left;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => theme.colors.cinza2};
    width: 100%;
    padding: 16px;

    h1 {
      font-size: 28px;
      color: ${({ theme }) => theme.colors.cinza2};
      font-weight: normal;
    }

    img {
      cursor: pointer;
    }
  }

  p {
    cursor: pointer;
    width: 100%;
    height: 33.3%;
    padding: 15px 5px;
    background: white;
    transition: all 0.2s ease-in;
    font-size: 22px;
    padding: 16px;
  }
`;

export const FilterContainer = styled.div`
  text-align: left;

  & > div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => theme.colors.cinza2};
    width: 100%;
    padding: 16px;

    h1 {
      font-size: 28px;
      color: ${({ theme }) => theme.colors.cinza2};
      font-weight: normal;
    }

    img {
      cursor: pointer;
    }
  }
`;

export const FilterController = styled.div`
  padding: 16px;

  & > button:first-child {
    width: 160px;
    height: 30px;
    background: ${({ theme }) => theme.colors.lightBlue};
    border: 1px solid ${({ theme }) => theme.colors.lightBlue};
    color: #fff;
  }

  & > button:last-child {
    margin-left: 24px;
    margin-bottom: 24px;
    width: 160px;
    height: 30px;
    background: transparent;
    border: 1px solid ${({ theme }) => theme.colors.cinza2};
    color: ${({ theme }) => theme.colors.cinza2};
  }
`;
