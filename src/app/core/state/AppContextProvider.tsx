import { ReactElement, useEffect, useMemo, useReducer } from 'react';
import { IReactElementChildrenProps } from '../models/reactElementChildren.model';
import { IAppState } from '../models/context/IAppState.model';
import { initialAppState } from '../models/context/IAppState.model';
import { reducer } from './reducer';
import { StorageService } from '../services/storage.service';
import { AppContext } from './AppContext';

export const AppContextProvider = ({
  children,
}: IReactElementChildrenProps): ReactElement => {
  const storageService = useMemo(() => new StorageService(), []);

  const loadInitialState = (): IAppState => {
    return storageService.get<IAppState>('APP_STATE')
      ? storageService.get<IAppState>('APP_STATE')!
      : initialAppState;
  };

  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState);

  useEffect(() => {
    storageService.set<IAppState>('APP_STATE', state);
  }, [state, storageService]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
