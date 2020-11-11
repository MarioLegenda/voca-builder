import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';

import * as form from './../styles/form.styles';
import * as root from './index.styles';

const query = graphql`
  query {
    metadataJson {
      add_word {
        title
      }
    }
  }
`;

interface IAddWordMetadata {
  name: string;
}

export const Index: React.FC = () => {
  const data: IAddWordMetadata = useStaticQuery(query).metadataJson.add_word;

  return (
    <div css={root.root}>
      <input css={form.textField} type="text" placeholder="Your word" />
    </div>
  );
};
