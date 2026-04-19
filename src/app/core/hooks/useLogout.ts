// src/app/core/hooks/useLogout.ts
import { useContext } from 'react';
import { StorageService } from '../services/storage.service';
import { AppContext } from '../state/AppContext';
import { useNavigate } from 'react-router-dom';
import { Actions } from '../models/enums/Actions.enum';

const storageService = new StorageService();

export const useLogout = (): (() => void) => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = (): void => {
    storageService.remove('APP_STATE');
    dispatch({ type: Actions.Logout, payload: null });
    navigate('/login');
  };

  return logout;
};
