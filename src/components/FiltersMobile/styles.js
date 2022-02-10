import styled from 'styled-components';

export const ColorsContainer = styled.div`
  margin-left: 16px;
  margin-bottom: 8px;

  input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  input[type="checkbox"] + label {
    position: relative;
    cursor: pointer;
    padding-left: 24px;
  }

  input[type="checkbox"] + label::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    left: 0;
    bottom: 2px;
    border: solid 1px ${({ theme }) => theme.colors.cinza2};
    vertical-align: bottom;
  }

  input[type="checkbox"]:checked + label::after {
    content: "";
    position: absolute;
    left: 3px;
    bottom: 5px;
    width: 11px;
    height: 11px;
    background: ${({ theme }) => theme.colors.lightBlue};
  }

  label {
    text-transform: capitalize;
  }
`;

export const SizesContainer = styled.div`
  margin-left: 16px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-width: 160px;

  input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  input[type="checkbox"] + button {
    border-radius: none;
    border: 1px solid ${({ theme }) => theme.colors.cinza2};
    color: ${({ theme }) => theme.colors.cinza2};
    font-size: 16px;
    background: #fff;
    width: 32px;
    height: 32px;
    margin-right: 8px;
    margin-bottom: 8px;
  }

  input[type="checkbox"]:checked + button {
    border: 2px solid ${({ theme }) => theme.colors.lightBlue};
    color: #000;
  }

  label {
    display: block;
    cursor: pointer;
  }
`;

export const PricesContainer = styled.div`
  margin-left: 16px;
  margin-bottom: 10px;

  input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  input[type="radio"] + label {
    position: relative;
    cursor: pointer;
    padding-left: 24px;
  }

  input[type="radio"] + label::before {
    content: "";
    position: absolute;
    width: 15px;
    height: 15px;
    left: 0;
    bottom: 2px;
    border: solid 1px ${({ theme }) => theme.colors.cinza2};
    vertical-align: bottom;
  }

  input[type="radio"]:checked + label::after {
    content: "";
    position: absolute;
    left: 3px;
    bottom: 5px;
    width: 11px;
    height: 11px;
    background: ${({ theme }) => theme.colors.lightBlue};
  }
`;

export const TitleFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.cinza2};
  cursor: pointer;
`;
