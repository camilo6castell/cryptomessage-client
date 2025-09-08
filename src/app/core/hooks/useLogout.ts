import { useContext } from 'react';

import { StorageService } from '../services/general/storage.service';
import { AppContext } from '../state/AppContext';

import { useNavigate } from 'react-router-dom';
import { Actions } from '../models/enums/Actions.enum';

export const useLogout = (): (() => void) => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = (): void => {
    const storageService = new StorageService();
    storageService.remove('TOKEN');
    storageService.remove('CURRENT');

    dispatch({ type: Actions.Logout, payload: null });
    navigate('/login');
  };

  return logout;
};
