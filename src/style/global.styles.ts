import { css } from '@emotion/core';

export const global = css`
  :root {
    --unit-vh-base: 5vh;
    --unit-vw-base: 5vw;
    --unit-px-base: 5px;
    --unit-grid-base: 1fr;
    
    --base-font-size-px: 16px;
    --base-font-size-em: 1em;

    --color-highlight: rgb(244, 237, 231);
    --color-primary: rgb(224, 207, 230)
    --color-secondary: rgb(0, 81, 142);
    
    --color-text: rgb(48, 47, 59);
    --color-text-light: rgb(174, 174, 176);

    --background-color: var(--color-highlight);
  }

  html {
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  body {
    font-family: Roboto, Helvetica, sans-serif;
    font-size: var(--base-font-size-em);
    min-width: 320px;
    min-height: 100vh;
    background-color: var(--background-color);
  }
`;
