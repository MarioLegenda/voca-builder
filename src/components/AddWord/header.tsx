import React from 'react';

import * as index from './index.styles';

export const Header: React.F = () => {
  return (
    <div css={index.header}>
      <h1 css={index.title}>ADD A WORD</h1>

      <p css={index.explanation}>
        You can add a word of any language. What you translate this word to, is up to you. The language selection is only here to communicate with
        Yandex API to provide a more complete translation
      </p>
    </div>
  );
};
