import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Select from 'react-select';

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

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const selectStyles = {
    control: (base) => ({ ...base, border: '4px solid rgb(244, 237, 231)' }),
  };

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

        <div css={index.twoRowGrid}>
          <Select
            options={options}
            styles={selectStyles}
            placeholder="From language"
          />

          <Select
            options={options}
            styles={selectStyles}
            placeholder="To language"
          />
        </div>
      </div>
    </div>
  );
};
