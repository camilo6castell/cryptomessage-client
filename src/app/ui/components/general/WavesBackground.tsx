import styled from 'styled-components';
import Background from '../../../../assets/background.webm';
import { AppContext } from '../../../core/state/AppContext';
import { useContext } from 'react';
import { IAppState } from '../../../core/models/context/IAppState.model';
import { MainComponentsEnum } from '../../../core/models/enums/MainComponents.enum';

export default function BackgroundWaves() {
  const { state } = useContext(AppContext);
  return (
    <Wrap aria-hidden $state={state}>
      <video autoPlay loop muted playsInline className="background-video">
        <source src={Background} type="video/webm" />
        {/* <source src="tu-video.mp4" type="video/mp4" /> */}
        Tu navegador no soporta videos integrados.
      </video>
    </Wrap>
  );
}

const Wrap = styled.div<{ $state: IAppState }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -2;
  overflow: hidden;

  .background-video {
    width: 100%;
    height: 100%;
    object-fit: cover; // CRUCIAL: Esto hace que el video llene el espacio sin estirarse}

    filter: ${({ theme, $state }) => {
      return $state.app.mainState !== MainComponentsEnum.Login
        ? theme.waves.filterSecondary
        : theme.waves.filterPrimary;
    }};
  }
`;
