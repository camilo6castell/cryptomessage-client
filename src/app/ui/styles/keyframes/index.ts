import { keyframes } from 'styled-components';

export const colorTextAnimation = (color: string): unknown => keyframes`
    0%, 100% {
      color: ${color};
    }
    50% {
      color: var(--main-font-color);
    }
  `;

export const pulse = (color: string) => keyframes`
  0% {
    box-shadow: 0 0 0 0 ${color}66;
  }
  70% {
    box-shadow: 0 0 0 1rem ${color}00;
  }
  100% {
    box-shadow: 0 0 0 0 ${color}00;
  }
`;

export const waves = {
  floatA: keyframes`
    /* arranca totalmente fuera a la izquierda, pasa por el centro y sale totalmente a la derecha */
    0%   { transform: translate3d(-120%, -30%, 0) rotate(-8deg)  scale(1.05); opacity: 0.62; filter: blur(96px); }
    15%  { transform: translate3d(-60%,  -10%, 0) rotate(-4deg)  scale(1.02); opacity: 0.70; filter: blur(90px);  }
    30%  { transform: translate3d(-10%,   6%,   0) rotate(-1deg)  scale(1.00); opacity: 0.78; filter: blur(84px);  }
    50%  { transform: translate3d(0%,     0%,   0) rotate(0deg)    scale(1.00); opacity: 0.82; filter: blur(80px);  }
    65%  { transform: translate3d(40%,   -12%,   0) rotate(3deg)    scale(1.02); opacity: 0.75; filter: blur(86px);  }
    85%  { transform: translate3d(90%,   -18%,   0) rotate(6deg)    scale(1.04); opacity: 0.68; filter: blur(92px);  }
    100% { transform: translate3d(120%,  -28%,   0) rotate(8deg)    scale(1.06); opacity: 0.62; filter: blur(98px);  }
  `,

  floatB: keyframes`
    /* recorrido contrario con trayectoria vertical distinta para dar profundidad */
    0%   { transform: translate3d(120%,  30%, 0)    rotate(6deg)   scale(1.00); opacity: 0.60; filter: blur(110px); }
    12%  { transform: translate3d(80%,   12%, 0)    rotate(3deg)   scale(0.99); opacity: 0.68; filter: blur(104px); }
    28%  { transform: translate3d(30%,   -6%, 0)    rotate(1deg)   scale(1.01); opacity: 0.74; filter: blur(100px); }
    50%  { transform: translate3d(0%,    -18%, 0)   rotate(0deg)   scale(1.03); opacity: 0.80; filter: blur(90px);  }
    70%  { transform: translate3d(-45%,  -8%, 0)   rotate(-3deg)  scale(0.98); opacity: 0.72; filter: blur(108px); }
    88%  { transform: translate3d(-95%,   6%, 0)    rotate(-5deg)  scale(0.96); opacity: 0.66; filter: blur(116px); }
    100% { transform: translate3d(-120%,  28%, 0)   rotate(-7deg)  scale(0.95); opacity: 0.60; filter: blur(120px); }
  `,
};
