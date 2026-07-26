import { createContext } from 'react';
import { initialAppState } from '../models/context/IAppState.model';
import { IAppContext } from '../models/context/IAppContext.model';

// Crear el contexto con un valor inicial que contenga el state y dispatch
export const AppContext = createContext<IAppContext>({
  state: initialAppState, // state se inicializa con el valor de initialAppState
  dispatch: () => undefined, // dispatch se inicializa como una función vacíagit a
});
