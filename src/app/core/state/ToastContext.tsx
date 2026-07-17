import {
  createContext,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { ToastStack, ToastEntry } from '../../ui/components/general/Toast';

interface ToastContextType {
  showToast: (message: string, isDanger: boolean) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let idCounter = 0;

export const ToastProvider = ({
  children,
}: {
  children: ReactNode;
}): ReactElement => {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const toastsRef = useRef(toasts);
  toastsRef.current = toasts;

  const showToast = useCallback((message: string, isDanger: boolean) => {
    const id = ++idCounter;
    setToasts((prev) => [...prev, { id, message, isDanger }]);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  );
};

/**
 * Available anywhere under <ToastProvider>. Components that also accept a
 * local `showToast` prop (login/register forms) can keep doing so — this is
 * for the rest of the app (sending messages, creating chats, etc.) where
 * threading a prop through every hook isn't practical.
 */
export const useGlobalToast = (): ToastContextType => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useGlobalToast must be used within a ToastProvider');
  }
  return ctx;
};
