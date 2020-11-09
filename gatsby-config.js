module.exports = {
  siteMetadata: {
    title: `Vocabulary builder`,
    description: `Build your language vocabulary with fun games`,
    author: `Mario Škrlec`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Vocabulary build`,
        start_url: `/`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
