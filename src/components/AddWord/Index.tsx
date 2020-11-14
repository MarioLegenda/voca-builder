import { graphql, useStaticQuery } from 'gatsby';
import React, { useEffect, useRef, useState } from 'react';

import WordRepository from '../../app/repository/WordRepository';
import { IAddWordMetadata, IRepository, Word } from '../contracts';
import { useCountries, useRepositoryContainer } from '../hooks';
import { Form } from './form';
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

  const formMetadata = {
    addWordPlaceholder: metadata.form.placeholders.addWord,
    translation: metadata.form.placeholders.translation,
    translationDesc: metadata.form.placeholders.translationDesc,
  };

  return (
    <div css={index.root}>
      <Header title={metadata.title} explanation={metadata.explanation.addWord} />

      <Form countries={countries} formMetadata={formMetadata} />
    </div>
  );
};
