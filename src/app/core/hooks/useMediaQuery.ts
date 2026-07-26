import { useEffect, useState } from 'react';

export const useMediaQuery = (query: string): boolean => {
  const getMatch = (): boolean =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false;

  const [matches, setMatches] = useState<boolean>(getMatch);

  useEffect(() => {
    const mql = window.matchMedia(query);

    const handler = (e: MediaQueryListEvent): void => {
      setMatches(e.matches);
    };

    mql.addEventListener('change', handler);
    setMatches(mql.matches);

    return () => {
      mql.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
};
