import { createContext, ReactElement, useReducer } from 'react';

import { IReactElementChildrenProps } from '../models/reactElementChildren.model';
import { initialAppState } from '../models/context/IAppState.model';
import { IAppContext } from '../models/context/IAppContext.model';

import { reducer } from './reducer';

// Crear el contexto con un valor inicial que contenga el state y dispatch
export const AppContext = createContext<IAppContext>({
  state: initialAppState, // state se inicializa con el valor de initialAppState
  dispatch: () => null, // dispatch se inicializa como una función vacía
});
export const AppContextProvider = ({
  children,
}: IReactElementChildrenProps): ReactElement => {
  const [state, dispatch] = useReducer(reducer, initialAppState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
