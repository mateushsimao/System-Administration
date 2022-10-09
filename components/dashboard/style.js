import styled from "styled-components";

import { Box } from "@admin-bro/design-system";

export const Card = styled(Box)`
    display: ${({flex}) => (flex ? 'flex' : 'block')} ;
    color: ${({ theme }) => theme.colors.grey100};
    text-decoration: none;
    border: 1px solid transparent;
    height: 100%;
    padding: 1rem 5px 5px;
    &:hover {
        boder: 1px solid ${({ theme })=> theme.colors.pimary100};
        box-shadows: ${({ theme }) => theme.shadows.cardHover};
    }

`;

Card.defaultProps = {
    variant: "white",
    boxShadow: "card",
}