import { useRef, useState, useEffect } from 'react';

export const useDynamicHeightFontSize = (
  heightFactor: number
): [React.RefObject<HTMLDivElement>, number] => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(0);

  useEffect(() => {
    const handleResize = (): void => {
      if (elementRef.current) {
        const containerHeight = elementRef.current.offsetHeight;
        setFontSize(containerHeight * heightFactor);
      }
    };

    const observer = new ResizeObserver(handleResize);
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    handleResize(); // Inicializa el tamaño

    return (): void => {
      observer.disconnect();
    };
  }, [heightFactor]);

  return [elementRef, fontSize];
};
