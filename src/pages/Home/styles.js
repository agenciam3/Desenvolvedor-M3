import styled from 'styled-components';

export const Container = styled.div`

  & > div:first-child {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;
  }

  & > div:last-child {
    display: flex;

    & main {
      flex: 1;
      display: flex;
      flex-direction: column;

      & > div:first-child {
        display: flex;
        flex-wrap: wrap;

        & > div {
          width: 33.3%;
          padding: 0 0 32px;
          text-align: center;

          @media (max-width: 1100px) {
            width: 50%;
          }

          @media (max-width: 900px) {
            & > img, button {
              width: 160px;
            }

            & > p {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }

          @media (max-width: 400px) {
            & > img, button {
              width: 150px;
            }

            & > p {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }

          @media (max-width: 380px) {
            width: 100%;
          }
        }
      }

      & > button:last-child {
        background: ${({ theme }) => theme.colors.lightBlue};
        border: 1px solid ${({ theme }) => theme.colors.lightBlue};
        color: #fff;
        height: 35px;
        padding: 0 32px;
        font-weight: bold;
        margin: 32px auto 0;
      }
    }
  }
`;

export const TopContainer = styled.div`
  @media (max-width: 900px) {
    display: none;
  }
`;

export const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: 901px) {
    display: none;
  }

  p {
    font-size: 32px;
    color: ${({ theme }) => theme.colors.cinza};
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: 16px;
    margin-bottom: 32px;

    button {
      width: 40%;
      height: 49px;
      background: transparent;
      font-size: 24px;
      color: ${({ theme }) => theme.colors.cinza2};
      border: 1px solid ${({ theme }) => theme.colors.cinza2};

      @media (max-width: 550px) {
        width: 50%;
      }

      @media (max-width: 350px) {
        font-size: 20px;
      }
    }

    button + button {
      border-left: none;
    }
  }
`;

export const PageTitle = styled.p`
  font-size: 32px;
  color: ${({ theme }) => theme.colors.cinza};

  @media (max-width: 900px) {
    display: none;
  }
`;

export const OrderBy = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 42px;
  width: 142px;
  border: 1px solid ${({ theme }) => theme.colors.cinza2};

  p, img{
    margin: 0 auto;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

export const OrderByOpen = styled.div`
  position: absolute;
  top: 40px;
  left: -1px;
  height: 107px;
  width: 142px;
  border: 1px solid ${({ theme }) => theme.colors.cinza2};

  p {
    width: 100%;
    height: 33.3%;
    padding: 5px;
    background: white;
    transition: all 0.2s ease-in;

    :hover {
      color: white;
      background: ${({ theme }) => theme.colors.lightBlue};
    }
  }
`;

export const FilterContainer = styled.div`
  width: 250px;
  margin-right: 24px;

  @media (max-width: 1150px) {
    width: 200px;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

export const Product = styled.div`
  & > p:nth-child(2) {
    text-transform: uppercase;
  }

  & > button {
    border: 1px solid ${({ theme }) => theme.colors.button};
    background: ${({ theme }) => theme.colors.button};
    color: #fff;
    width: 100%;
    height: 40px;
    max-width: 195px;
    font-weight: bold;
  }
`;
