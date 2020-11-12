import { graphql, useStaticQuery } from 'gatsby';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Select from 'react-select';

import { Country } from '../../app/http/model/Country';
import { useCountries } from '../hooks';
import * as form from './../styles/form.styles';
import * as index from './index.styles';

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

    countryList {
      data {
        alpha2Code
        alpha3Code
        name
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
  const q = useStaticQuery(query);

  const metadata: IAddWordMetadata = q.metadataJson.add_word;
  const countries = useCountries(q.countryList.data);

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
            options={countries}
            styles={selectStyles}
            placeholder="From language"
          />

          <Select
            options={countries}
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
