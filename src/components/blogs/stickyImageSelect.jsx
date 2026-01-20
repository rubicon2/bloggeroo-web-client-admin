import BlogImagesList from './blogImagesList';
import { NavButton } from '../styles/buttons';
import { useState } from 'react';
import styled from 'styled-components';

const Absolute = styled.div`
  position: sticky;
  bottom: 0;
  text-align: center;
  background-color: var(--theme-main-color);
  color: rgba(255, 255, 255, 0.87);
  width: 100%;
  // padding: 0.5rem;
  font-weight: 600;
  user-select: none;

  > button {
    width: 100%;
  }
`;

export default function StickyImageSelect({ onClick = () => {} }) {
  const [open, setOpen] = useState(false);
  return (
    <Absolute>
      {open && (
        <BlogImagesList onClick={onClick} onClose={() => setOpen(false)} />
      )}
      <NavButton onClick={() => setOpen(!open)}>
        {open ? 'Close' : 'Add Images'}
      </NavButton>
    </Absolute>
  );
}
