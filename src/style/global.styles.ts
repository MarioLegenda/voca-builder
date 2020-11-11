import { css } from '@emotion/core';

export const global = css`
  :root {
    --unit-vh-base: 5vh;
    --unit-vw-base: 5vw;
    --unit-px-base: 5px;
    --unit-grid-base: 1fr;

    --background-color: #e4e4e4;

    --base-font-size-px: 16px;
    --base-font-size-em: 1em;
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
