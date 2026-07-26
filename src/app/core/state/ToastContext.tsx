import { createContext } from 'react';

export interface ToastContextType {
  showToast: (message: string, isDanger: boolean) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);
