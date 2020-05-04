const _ = require(`lodash`);
const { paginate } = require(`gatsby-awesome-pagination`);
const { createRemoteFileNode } = require(`gatsby-source-filesystem`);
const readingTime = require('reading-time');

/**
 * Here is the place where Gatsby creates the URLs for all the
 * posts, tags, pages and authors that we fetched from the Ghost site.
 */

exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createFieldExtension, createTypes } = actions;
  createFieldExtension({
    name: "readingTime",
    extend(options, prevFieldConfig) {
      return {
        resolve(source) {
          const readingTimeValue = readingTime(source.html);
          return readingTimeValue.text;
        }
      };
    }
  });

  createTypes(`
    type GhostPost implements Node {
      readingTime: String @readingTime
    }
  `);

  createTypes(`
    type GhostPage implements Node {
      readingTime: String @readingTime
    }
  `);
};

exports.onCreateNode = async ({
  node,
  actions,
  store,
  createNodeId,
  cache
}) => {
  // Check that we are modifying right node types.
  const nodeTypes = [`GhostPost`, `GhostPage`];
  if (!nodeTypes.includes(node.internal.type)) {
    return;
  }

  const { createNode } = actions;

  // Download image and create a File node with gatsby-transformer-sharp.
  if (node.feature_image) {
    const fileNode = await createRemoteFileNode({
      url: node.feature_image,
      store,
      cache,
      createNode,
      parentNodeId: node.id,
      createNodeId
    });

    if (fileNode) {
      // Link File node to GhostPost node at field image.
      node.localFeatureImage___NODE = fileNode.id;
    }
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allGhostPost(
        sort: { order: ASC, fields: published_at }
        filter: { slug: { ne: "data-schema" } }
      ) {
        edges {
          node {
            slug
            primary_tag {
              slug
            }
          }
        }
      }
      allGhostTag(sort: { order: ASC, fields: name }) {
        edges {
          node {
            slug
            url
            postCount
          }
        }
      }
      allGhostAuthor(sort: { order: ASC, fields: name }) {
        edges {
          node {
            slug
            url
            postCount
          }
        }
      }
      allGhostPage(sort: { order: ASC, fields: published_at }) {
        edges {
          node {
            slug
            url
          }
        }
      }
      site {
        siteMetadata {
          postsPerPage
        }
      }

      ghostSettings {
        title
      }
    }
  `);

  // Check for any errors
  if (result.errors) {
    throw new Error(result.errors);
  }

  // Extract query results
  const tags = result.data.allGhostTag.edges;
  const authors = result.data.allGhostAuthor.edges;
  const pages = result.data.allGhostPage.edges;
  const posts = result.data.allGhostPost.edges;
  const postsPerPage = result.data.site.siteMetadata.postsPerPage;
  const websiteTitle = result.data.ghostSettings.title;

  // Load templates
  const indexTemplate = require.resolve(`./src/templates/indexTemplate.jsx`);
  const postTemplate = require.resolve("./src/templates/postTemplate.jsx");
  const tagsTemplate = require.resolve(`./src/templates/tagsTemplate.jsx`);
  const authorTemplate = require.resolve(`./src/templates/authorTemplate.jsx`);
  const pageTemplate = require.resolve(`./src/templates/pageTemplate.jsx`);
  const postAmpTemplate = require.resolve(
    `./src/templates/postTemplate.amp.jsx`
  );

  // Create author pages
  authors.forEach(({ node }) => {
    const totalPosts = node.postCount !== null ? node.postCount : 0;
    const numberOfPages = Math.ceil(totalPosts / postsPerPage);

    // This part here defines, that our author pages will use
    // a `/author/:slug/` permalink.
    node.url = `/author/${node.slug}/`;

    Array.from({ length: numberOfPages }).forEach((_, i) => {
      const currentPage = i + 1;
      const prevPageNumber = currentPage <= 1 ? null : currentPage - 1;
      const nextPageNumber =
        currentPage + 1 > numberOfPages ? null : currentPage + 1;
      const previousPagePath = prevPageNumber
        ? prevPageNumber === 1
          ? node.url
          : `${node.url}page/${prevPageNumber}/`
        : null;
      const nextPagePath = nextPageNumber
        ? `${node.url}page/${nextPageNumber}/`
        : null;

      createPage({
        path: i === 0 ? node.url : `${node.url}page/${i + 1}/`,
        component: authorTemplate,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.slug,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numberOfPages: numberOfPages,
          humanPageNumber: currentPage,
          prevPageNumber: prevPageNumber,
          nextPageNumber: nextPageNumber,
          previousPagePath: previousPagePath,
          nextPagePath: nextPagePath
        }
      });
    });
  });

  // Create pages

  posts.forEach(({ node }, index, array) => {
    createPage({
      path: node.slug,
      component: postTemplate,
      context: {
        slug: node.slug,
        prev: index !== 0 ? array[index - 1].node.slug : null,
        next: index !== array.length - 1 ? array[index + 1].node.slug : null
      }
    });

    createPage({
      path: `${node.slug}/amp`,
      component: postAmpTemplate,
      context: {
        slug: node.slug,
        title: websiteTitle,
        amp: true
      }
    });
  });

  tags.forEach(({ node }, i) => {
    const totalPosts = node.postCount !== null ? node.postCount : 0;
    const numberOfPages = Math.ceil(totalPosts / postsPerPage);
    node.url = `/tag/${node.slug}/`;

    Array.from({ length: numberOfPages }).forEach((_, i) => {
      const currentPage = i + 1;
      const prevPageNumber = currentPage <= 1 ? null : currentPage - 1;
      const nextPageNumber =
        currentPage + 1 > numberOfPages ? null : currentPage + 1;
      const previousPagePath = prevPageNumber
        ? prevPageNumber === 1
          ? node.url
          : `${node.url}page/${prevPageNumber}/`
        : null;
      const nextPagePath = nextPageNumber
        ? `${node.url}page/${nextPageNumber}/`
        : null;

      createPage({
        path: i === 0 ? node.url : `${node.url}page/${i + 1}/`,
        component: tagsTemplate,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.slug,
          limit: postsPerPage,
          skip: i * postsPerPage,
          numberOfPages: numberOfPages,
          humanPageNumber: currentPage,
          prevPageNumber: prevPageNumber,
          nextPageNumber: nextPageNumber,
          previousPagePath: previousPagePath,
          nextPagePath: nextPagePath
        }
      });
    });
  });

  pages
    .filter(({ node }) => !node.slug.startsWith("contact"))
    .forEach(({ node }) => {
      // This part here defines, that our pages will use
      // a `/:slug/` permalink.
      node.url = `/${node.slug}/`;

      createPage({
        path: node.url,
        component: pageTemplate,
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.slug
        }
      });
    });

  // Create pagination
  paginate({
    createPage,
    items: posts,
    itemsPerPage: postsPerPage,
    component: indexTemplate,
    pathPrefix: ({ pageNumber }) => {
      if (pageNumber === 0) {
        return `/`;
      } else {
        return `/page`;
      }
    }
  });
};
