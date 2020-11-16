/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const axios = require('axios');
const path = require('path');

function createCountryNode(createNode, createNodeId, createContentDigest, data) {
  const node = {
    data: data,
    name: 'countries',
    type: 'countryList',
    id: createNodeId(`countryList`),
    internal: {
      type: 'countryList',
      contentDigest: createContentDigest(data),
    },
  };

  createNode(node);
}

async function getCountries() {
  const countries = await axios.get('https://restcountries.eu/rest/v2/all');

  return countries.data.map((c) => {
    return {
      alpha2Code: c.alpha2Code,
      alpha3Code: c.alpha3Code,
      name: c.name,
    };
  });
}

/**
 * Create a node with a list of countries as an array
 * [
 *  {
 *    name: {name}
 *    alpha2Code: AR
 *    alpha3Code: ARI
 *  },
 *  ...
 * ]
 * @param actions
 * @returns {Promise<void>}
 */
exports.sourceNodes = async ({ actions, createNodeId, createContentDigest, cache }) => {
  const cacheKey = 'countryList';
  let obj = await cache.get(cacheKey);

  if (!obj) {
    const countries = await getCountries();
    await cache.set(cacheKey, countries);

    createCountryNode(actions.createNode, createNodeId, createContentDigest, countries);
  } else {
    createCountryNode(actions.createNode, createNodeId, createContentDigest, obj);
  }
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/word/)) {
    page.matchPath = "/word/:id/:name"

    // Update the page.
    createPage(page)
  }
}