const path = require(`path`);

const siteConfigDefaults = require(`./src/utils/siteConfig`);
const ghostConfigDefaults = require(`./src/utils/.ghost.json`);

const generateRSSFeed = require(`./src/utils/rss/generate-feed`);

module.exports = (themeOptions) => {
  const siteConfig = themeOptions.siteConfig || siteConfigDefaults;
  const ghostConfig = themeOptions.ghostConfig || ghostConfigDefaults;
  const finalConfig =
    process.env.NODE_ENV === `development`
      ? ghostConfig.development
      : ghostConfig.production;

  siteConfig.apiUrl = finalConfig.apiUrl;
  return {
    siteMetadata: siteConfig,
    plugins: [
      {
        resolve: `gatsby-plugin-sass`,
        options: {
          sassRuleModulesTest: /.*\.module\.s(a|c)ss$/,
        },
      },
      {
        resolve: `gatsby-plugin-page-creator`,
        options: {
          path: path.join(__dirname, `src`, `pages`),
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: path.join(__dirname, `src`, `images`),
          name: `images`,
        },
      },
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`,
      {
        resolve: `gatsby-source-ghost`,
        options:
          process.env.NODE_ENV === `development`
            ? ghostConfig.development
            : ghostConfig.production,
      },
      {
        resolve: `gatsby-transformer-rehype`,
        options: {
          filter: (node) =>
            node.internal.type === `GhostPost` ||
            node.internal.type === `GhostPage`,
          plugins: [
            {
              resolve: `gatsby-rehype-prismjs`,
            },
            {
              resolve: `gatsby-rehype-ghost-links`,
            },
          ],
        },
      },
      /**
       *  Utility Plugins
       */
      {
        resolve: require.resolve(`./plugins/gatsby-plugin-ghost-manifest`),
        options: {
          short_name: siteConfig.shortTitle,
          start_url: `/`,
          background_color: siteConfig.backgroundColor,
          theme_color: siteConfig.themeColor,
          display: `minimal-ui`,
          icon: `static/${siteConfig.siteIcon}`,
          legacy: true,
          query: `{
            site {
              siteMetadata {
                siteTitle
                siteDescription
              }
            }
          }`,
        },
      },
      {
        resolve: `gatsby-plugin-feed`,
        options: {
          query: `{
            allGhostSettings {
              edges {
                node {
                  title
                  description
                }
              }
            }
          }`,
          feeds: [generateRSSFeed(siteConfig)],
        },
      },
      {
        resolve: `gatsby-plugin-advanced-sitemap`,
        options: {
          query: `{
            allGhostPost {
              edges {
                node {
                  id
                  slug
                  updated_at
                  created_at
                  feature_image
                }
              }
            }
            allGhostPage {
              edges {
                node {
                  id
                  slug
                  updated_at
                  created_at
                  feature_image
                }
              }
            }
            allGhostTag {
              edges {
                node {
                  id
                  slug
                  feature_image
                }
              }
            }
            allGhostAuthor {
              edges {
                node {
                  id
                  slug
                  profile_image
                }
              }
            }
          }
          `,
          mapping: {
            allGhostPost: {
              sitemap: `posts`,
            },
            allGhostTag: {
              sitemap: `tags`,
            },
            allGhostAuthor: {
              sitemap: `authors`,
            },
            allGhostPage: {
              sitemap: `pages`,
            },
          },
          exclude: [
            `/dev-404-page`,
            `/404`,
            `/404.html`,
            `/offline-plugin-app-shell-fallback`,
            `/offline`,
            `/offline.html`,
          ],
          createLinkInHead: true,
          addUncaughtPages: true,
        },
      },
      `gatsby-plugin-catch-links`,
      `gatsby-plugin-react-helmet`,
      `gatsby-plugin-force-trailing-slashes`,
      {
        resolve: `gatsby-plugin-postcss`,
        options: {
          postCssPlugins: [require(`cssnano`)()],
        },
      },
      {
        resolve: `@draftbox-co/gatsby-plugin-amp`,
        options: {
          canonicalBaseUrl: siteConfig.siteUrl,
          components: [`amp-form`],
          excludedPaths: [`/404*`, `/`, `/offline*`],
          pathIdentifier: `amp/`,
          relAmpHtmlPattern: `{{canonicalBaseUrl}}{{pathname}}{{pathIdentifier}}`,
          useAmpClientIdApi: true,
          dirName: __dirname,
          themePath: `src/amp-styles/post.amp.css`,
        },
      },
      {
        resolve: `gatsby-plugin-remove-generator`,
        options: {
          content: `Draftbox`,
        },
      },
      {
        resolve: `@draftbox-co/gatsby-plugin-webfonts`,
        options: {
          fonts: {
            google: siteConfig.themeConfig.fonts,
          },
          formats: ["woff2", "woff"],
          useMinify: true,
          usePreload: true,
          usePreconnect: true,
          blacklist: ["/amp"],
        },
      },
      {
        resolve: `@draftbox-co/gatsby-plugin-css-variables`,
        options: {
          variables: siteConfig.themeConfig.variables,
        },
      },
    ],
  };
};
