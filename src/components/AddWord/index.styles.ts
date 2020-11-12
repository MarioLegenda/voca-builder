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

  margin-bottom: calc(var(--unit-vh-base) * 2);
`;

export const translationWrapper = css`
  margin-bottom: calc(var(--unit-px-base) * 2);
`;

export const actionButton = css`
  background-color: white;
  border: none;
  float: right;
  padding: 0;
  cursor: pointer;
  font-size: calc(var(--base-font-size-px) - 2px);

  :hover {
    text-decoration: underline;
  }
`;

export const primaryButton = css`
  color: var(--color-primary);
  margin-left: calc(var(--unit-px-base) * 2);
`;

export const removeButton = css`
  color: red;
`;
