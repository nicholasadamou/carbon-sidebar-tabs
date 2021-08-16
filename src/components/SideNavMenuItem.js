import React from 'react';

import styled from 'styled-components';

const Container = styled.li`
    button {
        background: none;

        border: none;
        outline: inherit;

        color: inherit;

        cursor: pointer;
    }

    .side-nav__button {
        display: flex;
        align-items: center;

        position: relative;

        width: 100%;
        min-height: 2.5rem;

        padding: 0 1rem;

        font-size: 0.875rem;
        font-weight: normal;
        line-height: 1.125rem;
        letter-spacing: 0.16px;

        color: black;

        transition: color 110ms, background-color 110ms, outline 110ms;

        &--current {
            font-weight: bold;
            background-color: #dcdcdc;
        }

        &--current::before {
            content: '';

            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;

            width: 4px;

            background-color: #0f62fe;
        }
    }
`;

const SideNavMenuItem = (props) => (
    <Container className="bx--side-nav__menu-item">
        <button
            className={`side-nav__button
				${props.isActive ? 'side-nav__button--current' : ''}
			`}
            {...props}
        >
            <span className="side-nav__button-text">{props.children}</span>
        </button>
    </Container>
);

export default SideNavMenuItem;
