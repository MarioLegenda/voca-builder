import { css } from '@emotion/core';

export const root = css`
  display: flex;
  justify-content: center;

  background-color: var(--color-background);

  min-height: 100vh;
`;

export const main = css`
  margin: calc(var(--unit-vh-base) * 2) calc(var(--unit-vh-base) * 2);

  @media all and (min-width: 320px) {
    width: 100%;
  }

  @media all and (min-width: 660px) {
    width: 70%;
  }

  @media all and (min-width: 880px) {
    width: 50%;
  }
`;
