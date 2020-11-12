import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import Select from 'react-select';

import { IAddWordMetadata } from '../contracts';
import { useCountries } from '../hooks';
import * as form from './../styles/form.styles';
import { Header } from './header';
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

export const Index: React.FC = () => {
  const q = useStaticQuery(query);

  const metadata: IAddWordMetadata = q.metadataJson.add_word;
  const countries = useCountries(q.countryList.data);

  const selectStyles = {
    control: (base) => ({ ...base, border: '4px solid rgb(244, 237, 231)' }),
  };

  return (
    <div css={index.root}>
      <Header
        title={metadata.title}
        explanation={metadata.explanation.addWord}
      />

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
