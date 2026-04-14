import { useState } from 'react';
import { toastConfig } from '../../ui/styles/config/Themes';

export const useToast = () => {
  const [toast, setToastMessage] = useState<{
    message: string;
    isDanger: boolean;
  } | null>(null);

  const showToast = (message: string, isDanger: boolean) => {
    setToastMessage({ message, isDanger });
    setTimeout(() => setToastMessage(null), toastConfig.duration);
  };

  return { toast, showToast };
};
