import React from 'react';

import styled from 'styled-components';

import {
    SideNav,
    SideNavItems,
    SideNavMenuItem,
} from 'carbon-components-react/lib/components/UIShell';

import './App.scss';

/**
 * To add new tabs add this item as a child to the <SideNav> component.
 *
 * <SideNavMenuItem
		onClick={(e) => changeTab(e)}
		tab={#} <--- tab #. Make sure this is a distinct number from other tabs.
	>
		[tab title] <--- This is how the tab will be displayed on the sidebar.
	</SideNavMenuItem>


	To add the content that is shown to the right of the sidebar,
	add the following as a child to the div#tab-content-container:

	<Tab
		className="tab-#" <---- This number must match the corresponding <SideNavMenuItem tab={#}> as mentioned above.
		title="title" <--- What is shown in the <TopHeader> component.
	>
		<Content> <--- Place your component for this tab here.
	</Tab>
 */

const Container = styled.div`
    .bx--side-nav__items {
        padding-top: 2rem;

        background-color: #f4f4f4;
    }

    a.bx--side-nav__link[aria-current='page'],
    a.bx--side-nav__link--current {
        background-color: #dcdcdc;
    }

    a.bx--side-nav__link > .bx--side-nav__link-text,
    .bx--side-nav a.bx--header__menu-item .bx--text-truncate-end {
        font-size: 1rem;
        color: black;
    }

    .bx--side-nav__link {
        cursor: pointer;
    }

    a.bx--side-nav__link,
    .bx--side-nav a.bx--header__menu-item,
    .bx--side-nav
        .bx--header__menu-title[aria-expanded='true']
        + .bx--header__menu {
        min-height: 3rem;

        font-weight: 400;
    }

    .tab-container {
        margin-left: 16rem;
    }
`;

const Content = (props) => (
    <div className={`tab-container ${props.className}`}>{props.children}</div>
);

const App = () => {
    React.useEffect(() => {
        const document = window.document.body;

        const tabButtons = Array.from(
            document.querySelector('#tab-buttons').firstChild.children
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
        // if tab-# is active (e.g. has the --current class)
        // .tab-# content is visible
        // all other .tab-# content is display: none

        // if tab # is not active
        // make tab-# active
        // .tab-# content is visible
        // all other .tab-# content is display: none

        let element = e.target;

        if (element.className.includes('bx--side-nav__link-text')) {
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
                    .replace('bx--side-nav__link--current', '')
                    .trim();
            }
        });

        element.className = `${element.className} bx--side-nav__link--current`;

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
            <SideNav
                expanded
                isFixedNav
                isChildOfHeader={false}
                id="tab-buttons"
            >
                <SideNavItems>
                    <SideNavMenuItem
                        onClick={(e) => changeTab(e)}
                        tab={1}
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
                <Content className="tab-1">
                    <p>Tab Content 0</p>
                </Content>
                <Content className="tab-2">
                    <p>Tab Content 1</p>
                </Content>
            </div>
        </Container>
    );
};

export default App;
