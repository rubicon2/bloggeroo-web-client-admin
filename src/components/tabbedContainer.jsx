import { NavButton } from './styles/buttons';
import { devices } from '../mediaQueries';
import { useState } from 'react';
import styled from 'styled-components';

const TabButtonContainer = styled.div`
  border-bottom: 2px solid var(--theme-soft-outline-color);
  margin-bottom: 1rem;

  @media ${devices.tablet} {
    display: flex;
  }
`;

const TabPanelContainer = styled.div``;

const TabButton = styled(NavButton)`
  display: block;
  width: 100%;

  background-color: var(--theme-bg-color);
  color: var(--theme-text-color);

  font-size: 1.2rem;
  font-weight: 700;

  &:hover {
    color: var(--theme-text-color);
    filter: brightness(0.5);
  }

  filter: brightness(0.8);

  &.selected {
    background-color: var(--theme-bg-color);
    filter: none;
  }
`;

const TabPanel = styled.div`
  &:not(.selected) {
    display: none;
  }
`;

/**
 * @typedef Tab
 * @type {object}
 * @property {string} id
 * @property {string} labelText // innerText of the tab button.
 * @property {React.ReactNode} content // What will be displayed when the tab is selected.
 */

/**
 * @typedef TabArray
 * @type {Array.<Tab>}
 */

/**
 * @callback tabbedContainerCallback
 * @param {string} tabId
 * @returns {number}
 */

/**
 *
 * @param {TabArray} tabs
 * @param {tabbedContainerCallback} [onTabChange = () => {}]
 */
export default function TabbedContainer({ tabs, onTabChange = () => {} }) {
  const initialTab = tabs[0];
  const [selectedTabId, setSelectedTabId] = useState(initialTab.id);

  const ariaOptions = new Intl.ListFormat('en', {
    style: 'long',
    type: 'disjunction',
  })
    .format(tabs.map((t) => t.labelText))
    .toLowerCase();

  const tabButtons = [];
  const tabPanels = [];

  for (const tab of tabs) {
    const className = tab.id === selectedTabId ? 'selected' : '';
    tabButtons.push(
      <TabButton
        className={className}
        onClick={() => {
          setSelectedTabId(tab.id);
          onTabChange(tab.id);
        }}
      >
        {tab.labelText}
      </TabButton>,
    );
    tabPanels.push(<TabPanel className={className}>{tab.content}</TabPanel>);
  }

  return (
    <div>
      <TabButtonContainer
        role="tablist"
        aria-label={`Select an option: ${ariaOptions}`}
      >
        {tabButtons}
      </TabButtonContainer>
      <TabPanelContainer>{tabPanels}</TabPanelContainer>
    </div>
  );
}
