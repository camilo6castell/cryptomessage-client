/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch } from 'react';
import { IAppState } from './IAppState.model';
import { Actions } from '../enums/Actions.enum';

export interface IAppContext {
  state: IAppState;
  dispatch: Dispatch<{ type: Actions; payload: any }>;
}
