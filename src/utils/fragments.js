import { graphql } from "gatsby";

/**
 * These so called fragments are the fields we query on each template.
 * A fragment make queries a bit more reuseable, so instead of typing and
 * remembering every possible field, you can just use
 *   ...GhostPostFields
 * for example to load all post fields into your GraphQL query.
 *
 * Further info 👉🏼 https://www.gatsbyjs.org/docs/graphql-reference/#fragments
 *
 */

// Used for site config
export const siteMetadataFields = graphql`
  fragment SiteMetadataFields on SiteSiteMetadata {
    siteUrl
    postsPerPage
    siteTitleMeta
    siteDescriptionMeta
    shareImageWidth
    shareImageHeight
    shortTitle
    siteIcon
    backgroundColor
    themeColor
    siteTitle
    siteDescription
    language
    logoUrl
    alternateLogoUrl
    coverUrl
    metadata {
      title
      description
    }
    twitterCard {
      title
      description
      imageUrl
      username
    }
    facebookCard {
      title
      description
      imageUrl
      appId
      height
      width
    }
  }
`;


// Used for settings
export const ghostSettingsFields = graphql`
  fragment GhostSettingsFields on GhostSettings {
    title
    description
    logo
    icon
    cover_image
    facebook
    twitter
    lang
    timezone
    codeinjection_head
    codeinjection_foot
    codeinjection_styles
    navigation {
      label
      url
    }
  }
`;
