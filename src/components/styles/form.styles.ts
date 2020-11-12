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

export const saveButton = css`
  margin: calc(var(--unit-px-base) * 10) 0 0 auto;
  display: inline-block;
  margin-left: auto;
  padding: calc(var(--unit-px-base) * 3);
  border-radius: var(--unit-px-base);

  color: white;
  background-color: var(--color-background);
  font-weight: bolder;
  font-size: var(--base-font-size-em);

  cursor: pointer;

  :disabled {
    cursor: not-allowed;
  }
`;
