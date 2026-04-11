import styled from 'styled-components';
import Background from '../../../../assets/background.webm';

export default function BackgroundWaves() {
  return (
    <Wrap aria-hidden>
      <video autoPlay loop muted playsInline className="background-video">
        <source src={Background} type="video/webm" />
        {/* <source src="tu-video.mp4" type="video/mp4" /> */}
        Tu navegador no soporta videos integrados.
      </video>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: absolute; // O absolute, dependiendo de tu layout
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1; // Para que quede detrás del contenido
  overflow: hidden;

  .background-video {
    width: 100%;
    height: 100%;
    object-fit: cover; // CRUCIAL: Esto hace que el video llene el espacio sin estirarse
    /* filter: brightness(0.6); // Aquí puedes ajustar la oscuridad por código si prefieres */
  }
`;
