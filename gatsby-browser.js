/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React from 'react';
import { Global } from '@emotion/core';
import { global } from './src/style/index';
import { normalize } from './src/style/normalize.styles';
import Layout from './src/components/layout';

export const wrapRootElement = ({ element }) => (
  <>
    <Global styles={[global, normalize]} />
    <Layout>{element}</Layout>
  </>
);
