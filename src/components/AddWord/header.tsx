import React from 'react';

import * as index from './index.styles';

interface Props {
  title: string;
  explanation: string;
}

export const Header: React.FC<Props> = (props: Props) => {
  const { title, explanation } = props;

  return (
    <div css={index.header}>
      <h1 css={index.title}>{title}</h1>

      <p css={index.explanation}>{explanation}</p>
    </div>
  );
};
