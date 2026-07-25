import { useEffect } from 'react';

interface KeyboardShortcutHandlers {
  goToChats: () => void;
  goToContacts: () => void;
  goToProfile: () => void;
  toggleSearch?: () => void;
}

export const useKeyboardShortcuts = (
  handlers: KeyboardShortcutHandlers
): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      const isMeta = event.metaKey || event.ctrlKey;

      if (isMeta && event.key === '1') {
        event.preventDefault();
        handlers.goToChats();
      }

      if (isMeta && event.key === '2') {
        event.preventDefault();
        handlers.goToContacts();
      }

      if (isMeta && event.key === '3') {
        event.preventDefault();
        handlers.goToProfile();
      }

      if (isMeta && event.key === 'k') {
        event.preventDefault();
        handlers.toggleSearch?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
};
