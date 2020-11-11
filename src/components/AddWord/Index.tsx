import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import * as form from './../styles/form.styles';
import * as index from './index.styles';

const query = graphql`
  query {
    metadataJson {
      add_word {
        title
        form {
          placeholder
        }
        explanation {
          addWord
        }
      }
    }
  }
`;

interface IAddWordMetadata {
  title: string;
  placeholder: string;
  form: { placeholder: string };
  explanation: { addWord: string };
}

export const Index: React.FC = () => {
  const metadata: IAddWordMetadata = useStaticQuery(query).metadataJson
    .add_word;

  return (
    <div css={index.root}>
      <div css={index.header}>
        <h1 css={index.title}>{metadata.title}</h1>

        <p css={index.explanation}>{metadata.explanation.addWord}</p>
      </div>

      <div>
        <input
          css={form.textField}
          type="text"
          placeholder={metadata.form.placeholder}
        />
      </div>
    </div>
  );
};
