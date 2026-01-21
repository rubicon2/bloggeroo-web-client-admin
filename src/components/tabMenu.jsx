import { NavButton } from './styles/buttons';
import UnstyledList from './unstyledList';
import styled from 'styled-components';

const TabContainer = styled(UnstyledList)`
  display: flex;
  border-bottom: 2px solid var(--theme-soft-outline-color);
`;

const TabButton = styled(NavButton)`
  background-color: var(--theme-bg-color);
  color: var(--theme-text-color);

  font-size: 1.2rem;
  font-weight: 700;

  :hover {
    color: black;
    background-color: pink;
  }

  * {
    :hover {
      color: black;
    }
    margin: 0;
  }

  filter: brightness(0.8);
`;

const SelectedTabButton = styled(TabButton)`
  background-color: var(--theme-bg-color);
  color: var(--theme-text-color);
  filter: none;
`;

export default function TabMenu({ selectedId, tabListItems, onClick }) {
  return (
    <TabContainer aria-label="secondary navigation">
      {tabListItems.map((tabListItem) => (
        <li>
          {tabListItem.id === selectedId ? (
            <SelectedTabButton
              key={tabListItem.id}
              onClick={() => onClick(tabListItem.id)}
              aria-selected="true"
            >
              {tabListItem.innerText}
            </SelectedTabButton>
          ) : (
            <TabButton
              key={tabListItem.id}
              onClick={() => onClick(tabListItem.id)}
            >
              {tabListItem.innerText}
            </TabButton>
          )}
        </li>
      ))}
    </TabContainer>
  );
}
