import { css } from '@emotion/core';

export const global = css`
  :root {
    --unit-vh-base: 5vh;
    --unit-px-base: 5px;
    --unit-grid-base: 1fr;
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
    font-size: 16px;
  }

  img {
    display: block;
    max-width: 100%;
    font-style: italic;
    image-rendering: auto;
  }
`;
