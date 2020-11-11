import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Select from 'react-select';

import * as form from './../styles/form.styles';
import * as index from './index.styles';
import CountryRepository from "../../app/repository/CountryRepository"

const query = graphql`
  query {
    metadataJson {
      add_word {
        title
        form {
          placeholders {
            addWord
            translation
            translationDesc
          }
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
  form: {
    placeholders: {
      addWord: string;
      translation: string;
      translationDesc: string;
    };
  };
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
          name="addWord"
          type="text"
          placeholder={metadata.form.placeholders.addWord}
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

        <div css={index.translationWrapper}>
          <input
            css={form.textField}
            type="text"
            placeholder={metadata.form.placeholders.translation}
          />

          <textarea
            css={form.textField}
            placeholder={metadata.form.placeholders.translationDesc}
          ></textarea>
        </div>
      </div>
    </div>
  );
};
