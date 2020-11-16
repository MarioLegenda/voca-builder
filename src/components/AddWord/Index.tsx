import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import { useCountries } from '../hooks';
import { Form } from './form';
import { Header } from './header';
import * as index from './index.styles';

const query = graphql`
  query {
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

  const countries = useCountries(q.countryList.data);

  return (
    <div css={index.root}>
      <Header />

      <Form countries={countries} />
    </div>
  );
};
