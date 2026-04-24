import { useContext } from 'react';
import { StorageService } from '../services/storage.service';
import { AppContext } from '../state/AppContext';
import { useNavigate } from 'react-router-dom';
import { Actions } from '../models/enums/Actions.enum';

// 🔥 IMPORTANTE
import { clearCrypto } from '../services/crypto.manager';

const storageService = new StorageService();

export const useLogout = (): (() => void) => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const logout = (): void => {
    storageService.remove('APP_STATE');

    // 🔥 limpiar memoria crypto
    clearCrypto();

    dispatch({ type: Actions.Logout, payload: null });

    navigate('/login');
  };

  return logout;
};
