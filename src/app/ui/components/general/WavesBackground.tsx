import styled from 'styled-components';
import { useContext, useState } from 'react';
import { AppContext } from '../../../core/state/AppContext';
import { IAppState } from '../../../core/models/context/IAppState.model';
import { MainComponentsEnum } from '../../../core/models/enums/MainComponents.enum';
import { Theme } from '../../styles/config/Themes';

/**
 * Served from /public/background.webm instead of a bundled static import.
 * This decouples the production build from having the (large, binary) video
 * asset physically present — if it's missing, the video element hides itself
 * and the app falls back to the theme's background color instead of failing
 * the build or showing a broken video frame.
 */
export default function BackgroundWaves() {
  const { state } = useContext(AppContext);
  const [hasError, setHasError] = useState(false);

  if (hasError) return null;

  return (
    <Wrap aria-hidden $state={state}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="background-video"
        onError={() => setHasError(true)}
      >
        <source src="/background.webm" type="video/webm" />
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
  background-color: black;

  .background-video {
    width: 100%;
    height: 100%;
    object-fit: cover; // CRUCIAL: Esto hace que el video llene el espacio sin estirarse

    filter: ${({ theme, $state }: { theme: Theme; $state: IAppState }) => {
      return $state.app.mainState !== MainComponentsEnum.Login
        ? theme.waves.filterSecondary
        : theme.waves.filterPrimary;
    }};
  }
`;
