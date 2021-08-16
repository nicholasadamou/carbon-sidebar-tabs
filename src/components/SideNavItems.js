import React from 'react';

import styled from 'styled-components';

const Container = styled.ul`
    list-style: none;

    flex: 1 1;

    padding: 1rem 0 0;
    padding-top: 4rem;

    background-color: #f4f4f4;

    overflow-y: auto;
`;

const SideNavItems = (props) => (
    <Container className="side-nav__items" {...props}>
        {props.children}
    </Container>
);

export default SideNavItems;
