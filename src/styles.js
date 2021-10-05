import styled from "styled-components";

export const BodyContainer = styled.div`
    ${({ filter, order }) => {
        if(filter===1||order===1)
            return `display: none;`;
        else
            return  `display: block;`;
    }}
`;