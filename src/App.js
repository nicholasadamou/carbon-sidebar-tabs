import React from 'react';

import styled from 'styled-components';

import SideNav from './components/SideNav';
import SideNavItems from './components/SideNavItems';
import SideNavMenuItem from './components/SideNavMenuItem';

import './App.scss';

const Container = styled.div`
    #tab-content-container {
        overflow-y: scroll;
    }

    .tab-container {
        margin-left: 16rem;

        .tab-content {
            margin: 32px 32px 48px 32px;
        }
    }
`;

const Tab = (props) => (
    <div className={`tab-container ${props.className}`}>
        <h3>{props.title}</h3>
        <div className="tab-content">{props.children}</div>
    </div>
);

const App = () => {
    React.useEffect(() => {
        const document = window.document.body;

        const tabButtons = Array.from(
            document.querySelector('.side-nav__navigation').firstChild.children
        );
        const tabContainers = Array.from(
            document.querySelector('#tab-content-container').children
        );

        const activeTab = tabButtons.filter((tab) =>
            tab.firstChild.className.includes('--current')
        )[0].firstChild;

        const activeTabIndex = activeTab.getAttribute('tab');

        const activeTabContainer = tabContainers.filter((tab) =>
            tab.className.includes(`tab-${activeTabIndex}`)
        )[0];
        activeTabContainer.style.display = 'block';

        tabContainers.forEach((tabContainer) => {
            if (!tabContainer.className.includes(`tab-${activeTabIndex}`)) {
                tabContainer.style.display = 'none';
            }
        });
    }, []);

    const changeTab = (e) => {
        let element = e.target;

        debugger;

        if (element.className.includes('text')) {
            element = element.parentNode;
        }

        const parent = element.offsetParent;

        const isCurrentTab = element.className.includes('--current');

        if (isCurrentTab) {
            return;
        }

        let tabs = Array.from(parent.firstChild.children);

        const tabIndex = element.getAttribute('tab');

        tabs.forEach((tab) => {
            const firstChild = tab.firstChild;

            if (firstChild.className.includes('--current')) {
                firstChild.className = firstChild.className
                    .replace('side-nav__button--current', '')
                    .trim();
            }
        });

        element.className = `${element.className} side-nav__button--current`;

        tabs = Array.from(parent.nextSibling.children);

        tabs.forEach((tab) => {
            if (tab.className.includes(`tab-${tabIndex}`) && !isCurrentTab) {
                tab.style.display = 'block';
            } else {
                tab.style.display = 'none';
            }
        });
    };

    return (
        <Container>
            <SideNav>
                <SideNavItems>
                    <SideNavMenuItem
                        tab={1}
                        onClick={(e) => changeTab(e)}
                        isActive
                    >
                        Tab 1
                    </SideNavMenuItem>
                    <SideNavMenuItem tab={2} onClick={(e) => changeTab(e)}>
                        Tab 2
                    </SideNavMenuItem>
                </SideNavItems>
            </SideNav>
            <div id="tab-content-container">
                <Tab className="tab-1" title="Test 1">
                    <p>Test 1</p>
                </Tab>
                <Tab className="tab-2" title="Test 2">
                    <p>Test 2</p>
                </Tab>
            </div>
        </Container>
    );
};

export default App;
