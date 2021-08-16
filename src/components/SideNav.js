import React from 'react';

import styled from 'styled-components';

const Container = styled.nav`
    display: flex;
    flex-direction: column;

    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;

    width: 14rem;
    height: 100vh;

    will-change: width;

    color: #525252;
    background-color: #f4f4f4;

    transition: width 0.11s cubic-bezier(0.2, 0, 1, 0.9);

    overflow: hidden;

    z-index: 6000;
`;

const SideNav = (props) => (
    <Container className="side-nav__navigation" {...props}>
        {props.children}
    </Container>
);

export default SideNav;
