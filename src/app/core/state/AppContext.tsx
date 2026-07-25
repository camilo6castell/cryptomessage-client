import { createContext, ReactElement, useEffect, useReducer } from 'react';

import { IReactElementChildrenProps } from '../models/reactElementChildren.model';
import { IAppState, initialAppState } from '../models/context/IAppState.model';
import { IAppContext } from '../models/context/IAppContext.model';

import { reducer } from './reducer';
import { StorageService } from '../services/storage.service';

// Crear el contexto con un valor inicial que contenga el state y dispatch
export const AppContext = createContext<IAppContext>({
  state: initialAppState, // state se inicializa con el valor de initialAppState
  dispatch: () => undefined, // dispatch se inicializa como una función vacíagit a
});
export const AppContextProvider = ({
  children,
}: IReactElementChildrenProps): ReactElement => {
  const storageService = new StorageService();

  const loadInitialState = (): IAppState => {
    return storageService.get<IAppState>('APP_STATE')
      ? storageService.get<IAppState>('APP_STATE')!
      : initialAppState;
  };

  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState);

  useEffect(() => {
    storageService.set<IAppState>('APP_STATE', state);
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
