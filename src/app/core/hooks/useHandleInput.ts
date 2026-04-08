import { useState } from 'react';
import { IUseHandleInput } from '../models/hooks/IUseHandleInput.model';

export const useHandleInput = <T extends Record<string, unknown>>(
  initialForm: T
): IUseHandleInput<T> => {
  const [form, setForm] = useState(initialForm);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const resetForm = (): void => setForm(initialForm);
  return { form, handleInput, resetForm };
};
