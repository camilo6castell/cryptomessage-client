import { ReactElement, ReactNode, useCallback, useRef, useState } from 'react';
import { ToastStack, ToastEntry } from '../../ui/components/general/Toast';
import { ToastContext } from './ToastContext';

let idCounter = 0;

export const ToastContextProvider = ({
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
