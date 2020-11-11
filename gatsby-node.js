/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it


const axios = require('axios');

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
exports.sourceNodes = async ({ actions, createNodeId, createContentDigest }) => {
  const get = axios.get('https://restcountries.eu/rest/v2/all');

  get.then((countries) => {
    const filtered = countries.data.map(c => {
      return {
        alpha2Code: c.alpha2Code,
        alpha3Code: c.alpha3Code,
        name: c.name,
      }
    });

    const node = {
      data: filtered,
      name: 'countries',
      type: 'countryList',
      id: createNodeId(`countryList`),
      internal: {
        type: "countryList",
        contentDigest: createContentDigest(filtered),
      },
    }

    actions.createNode(node);
  })
}