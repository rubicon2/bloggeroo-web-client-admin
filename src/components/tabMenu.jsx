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

export default function TabMenu({ selectedId, tabListItems, onClick }) {
  const ariaOptions = new Intl.ListFormat('en', {
    style: 'long',
    type: 'disjunction',
  })
    .format(tabListItems.map((t) => t.innerText))
    .toLowerCase();

  return (
    <TabContainer
      role="tablist"
      aria-label={`Select an option: ${ariaOptions}`}
    >
      {tabListItems.map((tabListItem) => (
        <li>
          <TabButton
            key={tabListItem.id}
            onClick={() => onClick(tabListItem.id)}
            role="tab"
            aria-selected={tabListItem.id === selectedId}
            className={tabListItem.id === selectedId ? 'selected' : ''}
          >
            {tabListItem.innerText}
          </TabButton>
        </li>
      ))}
    </TabContainer>
  );
}
