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
    font-family: Arial, Helvetica, sans-serif;
  }

  img {
    display: block;
    max-width: 100%;
    font-style: italic;
    image-rendering: auto;
  }

  .gatsby-image-wrapper img[src*='base64\\,'] {
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
  }
`;
