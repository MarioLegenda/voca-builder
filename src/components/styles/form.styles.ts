import { css } from '@emotion/core';

export const textField = css`
  width: 100%;
  font-size: calc(var(--base-font-size-em));
  padding: calc(var(--unit-px-base) * 2);
  border-radius: var(--unit-px-base);
  border: 4px solid var(--color-highlight);
`;

export const error = css`
  color: var(--color-error);
  border-left: 4px solid var(--color-error);
  padding-left: calc(var(--unit-px-base) * 2);
  margin-bottom: calc(var(--unit-px-base) * 5);
`;
