// src/CustomCursor.jsx
import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    const cursorRing = document.createElement('div');
    cursorRing.classList.add('cursor-ring');
    document.body.appendChild(cursorRing);

    const moveCursor = (e) => {
      cursorRing.style.top = `${e.clientY}px`;
      cursorRing.style.left = `${e.clientX}px`;
    };

    const clickDown = () => {
      cursorRing.style.transform = 'translate(-50%, -50%) scale(0.8)';
    };

    const clickUp = () => {
      cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mousedown', clickDown);
    document.addEventListener('mouseup', clickUp);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mousedown', clickDown);
      document.removeEventListener('mouseup', clickUp);
      cursorRing.remove();
    };
  }, []);

  return null;
}