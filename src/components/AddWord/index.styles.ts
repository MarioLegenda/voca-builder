import { css } from '@emotion/core';

export const root = css`
  background-color: white;
  padding: calc(var(--unit-px-base) * 5);
  border-radius: var(--unit-px-base);
`;

export const header = css`
  margin-bottom: var(--unit-vh-base);
  padding-bottom: calc(var(--unit-px-base));
`;

export const explanation = css`
  color: var(--color-text-light);
  font-style: italic;
  font-size: 14px;
`;

export const title = css`
  font-size: calc(var(--base-font-size-em));
  color: var(--color-text);
  border-bottom: 4px solid var(--color-highlight);
`;

export const twoRowGrid = css`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: var(--unit-px-base);
`;
