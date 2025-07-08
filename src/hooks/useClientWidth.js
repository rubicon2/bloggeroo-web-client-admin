import { useEffect, useState } from 'react';

export default function useClientWidth() {
  const [width, setWidth] = useState(window.screen.width);

  useEffect(() => {
    const updateWidth = () => setWidth(window.screen.width);
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  return width;
}
