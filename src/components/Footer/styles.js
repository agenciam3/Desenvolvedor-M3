import styled from 'styled-components';

export const Container = styled.footer`
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.footer};
  color: #fff;
  font-size: 14px;
  text-transform: uppercase;
`;
