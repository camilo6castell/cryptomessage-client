import { css } from 'styled-components';

export const mainScrollBar = css`
  &&::-webkit-scrollbar {
    width: var(--scroll-bar-size);
    transition: width 0.15s ease;
  }

  &&:hover::-webkit-scrollbar {
    width: var(--scroll-bar-hover-size);
  }

  &&::-webkit-scrollbar-track {
    background: var(--scroll-bar-track-color);
    border-radius: var(--scroll-bar-radius);
  }

  &&::-webkit-scrollbar-thumb {
    background: var(--scroll-bar-color);
    border-radius: var(--scroll-bar-radius);
    transition: background 0.15s ease;
  }

  &&:hover::-webkit-scrollbar-thumb {
    background: var(--scroll-bar-hover-color);
  }

  @supports not selector(::-webkit-scrollbar) {
    body {
      scrollbar-color: var(--scroll-bar-color) var(--scroll-bar-track-color);
      scrollbar-width: thin;
    }
  }
`;
