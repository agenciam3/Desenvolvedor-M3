import styled from 'styled-components';

export const PageContainer = styled.div`
  & > div {
    min-height: calc(100vh - 100px);
    padding: 40px 128px;

    @media (max-width: 900px) {
      padding: 24px;
    }
  }
`;
