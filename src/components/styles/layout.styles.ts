import { css } from '@emotion/core';

export const root = css`
  display: flex;
  justify-content: center;

  background-color: var(--background-color);

  min-height: 100vh;
`;

export const main = css`
  margin-top: calc(var(--unit-vh-base) * 2);

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
