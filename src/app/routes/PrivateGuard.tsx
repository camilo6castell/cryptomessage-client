import { ReactNode, useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

import http from '../core/services/general/http.service';
import urls from '../core/resources/url.resource';
import { IReactElementChildrenProps } from '../core/models/reactElementChildren.model';
import { StorageService } from '../core/services/general/storage.service';
import { AppContext } from '../core/state/AppContext';
import { Actions } from '../core/models/enums/Actions.enum';
import { MainComponentsEnum } from '../core/models/enums/MainComponents.enum';
import { IGatewayLoginFormResponse } from '../core/models/ui/IGatewayForm.model';
import loadUserMap from '../core/mappers/loadUser.map';

export const PrivateGuard = ({
  children,
}: IReactElementChildrenProps): ReactNode => {
  const { dispatch } = useContext(AppContext);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  useEffect(() => {
    const storageService = new StorageService();
    const token = storageService.get<string>('TOKEN');
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    http
      .post(urls.verifyToken, { token: token })
      .then((response) => {
        const { status, data } = response as IGatewayLoginFormResponse;
        switch (status) {
          case 200:
            {
              setIsAuthenticated(true);
              dispatch({
                type: Actions.LoadUser,
                payload: loadUserMap.toModel(data!),
              });
              if (storageService.get<MainComponentsEnum>('CURRENT') === null) {
                storageService.set<MainComponentsEnum>(
                  'CURRENT',
                  MainComponentsEnum.ChatList,
                );
                dispatch({
                  type: Actions.SetMainState,
                  payload: MainComponentsEnum.ChatList,
                });
              } else {
                dispatch({
                  type: Actions.SetMainState,
                  payload: storageService.get<MainComponentsEnum>('CURRENT'),
                });
              }
            }
            break;
          default: {
            setIsAuthenticated(false);
            storageService.remove('TOKEN');
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  if (isAuthenticated === null) {
    return <div>Cargando...</div>;
  }
  if (!isAuthenticated) {
    return <Navigate to={'/login'} replace />;
  }
  return children;
};
