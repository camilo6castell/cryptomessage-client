import { useState } from 'react';

export const useToast = () => {
  const [toast, setToastMessage] = useState<{
    message: string;
    isDanger: boolean;
  } | null>(null);

  const showToast = (message: string, isDanger: boolean) => {
    setToastMessage({ message, isDanger });
  };

  const hideToast = () => {
    setToastMessage(null);
  };

  return { toast, showToast, hideToast };
};
