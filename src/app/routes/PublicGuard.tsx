import { ReactNode, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../core/state/AppContext';
import { IReactElementChildrenProps } from '../core/models/reactElementChildren.model';

export const PublicGuard = ({
  children,
}: IReactElementChildrenProps): ReactNode => {
  const { state } = useContext(AppContext);

  const isAuthenticated = !!state.user?.token;

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};
