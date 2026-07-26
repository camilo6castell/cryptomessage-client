import { useContext } from 'react';
import { ToastContext, ToastContextType } from '../state/ToastContext';

export const useGlobalToast = (): ToastContextType => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useGlobalToast must be used within a ToastProvider');
  }
  return ctx;
};
