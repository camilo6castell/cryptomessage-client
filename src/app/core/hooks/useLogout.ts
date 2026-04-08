// src/app/core/hooks/useLogout.ts
import { useContext } from 'react';
import { StorageService } from '../services/storage.service';
import { AppContext } from '../state/AppContext';
import { useNavigate } from 'react-router-dom';
import { Actions } from '../models/enums/Actions.enum';

export const useLogout = (): (() => void) => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = (): void => {
    const storage = new StorageService();
    storage.remove('TOKEN');
    storage.remove('CURRENT');
    storage.remove('ENCRYPTED_PRIVATE_KEY'); // agregado

    dispatch({ type: Actions.Logout, payload: null });
    navigate('/login');
  };

  return logout;
};
