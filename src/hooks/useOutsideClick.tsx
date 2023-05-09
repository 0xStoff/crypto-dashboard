import { useEffect, useRef } from 'react';

type OutsideClickHandler = () => void;

const useOutsideClick = (onOutsideClick: OutsideClickHandler) => {
  const addressItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addressItemRef.current && !addressItemRef.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [addressItemRef, onOutsideClick]);

  return addressItemRef;
};

export default useOutsideClick;
