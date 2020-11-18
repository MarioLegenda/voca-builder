const path = require('path');

module.exports = {
  siteMetadata: {
    title: `Vocabulary builder`,
    description: `Build your language vocabulary with fun games`,
    author: `Mario Škrlec`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.ts$|\.tsx$/,
        exclude: /(node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: true,
          fix: true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        pages: path.join(__dirname, 'src/pages'),
        components: path.join(__dirname, 'src/components'),
        style: path.join(__dirname, 'src/style'),
        assets: path.join(__dirname, 'src/assets'),
        utils: path.join(__dirname, 'src/utils'),
        templates: path.join(__dirname, 'src/templates'),
      },
    },
    `gatsby-plugin-emotion`,
    `gatsby-transformer-json`,
  ],
};
