import { ReactElement } from 'react';
import { SideRail } from '../ui/components/navbar/SideRail';

export const NavBarContainer = ({
  isConnected,
}: {
  isConnected: boolean;
}): ReactElement => {
  return <SideRail isConnected={isConnected} />;
};
