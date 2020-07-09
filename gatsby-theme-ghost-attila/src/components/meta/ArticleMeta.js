import React from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import PropTypes from "prop-types";
import _ from "lodash";
import url from "url";

import getAuthorProperties from "./getAuthorProperties";
import ImageMeta from "./ImageMeta";

import { tags as tagsHelper } from "@tryghost/helpers";

const ArticleMetaGhost = ({ data, settings, canonical, amp }) => {
  const ghostPost = data;
  const config = settings.site.siteMetadata;
  settings = settings.allGhostSettings.edges[0].node;

  const author = getAuthorProperties(ghostPost.primary_author);
  const publicTags = _.map(
    tagsHelper(ghostPost, { visibility: `public`, fn: (tag) => tag }),
    `name`
  );
  const primaryTag = publicTags[0] || ``;

  const postHeroImage = ghostPost.localFeatureImage?.seo?.fixed?.src;

  const shareImage = postHeroImage
    ? url.resolve(config.siteUrl, postHeroImage)
    : config.coverUrl ||
      config.facebookCard.imageUrl ||
      config.twitterCard.imageUrl
    ? url.resolve(
        config.siteUrl,
        config.coverUrl ||
          config.facebookCard.imageUrl ||
          config.twitterCard.imageUrl
      )
    : null;

  const publisherLogo =
    config.logoUrl || config.alternateLogoUrl
      ? url.resolve(config.siteUrl, config.logoUrl || config.alternateLogoUrl)
      : null;

  const jsonLd = {
    "@context": `https://schema.org/`,
    "@type": `Article`,
    author: author
      ? {
          "@type": `Person`,
          name: author.name,
          image: author.image ? author.image : undefined,
          sameAs: author.sameAsArray ? author.sameAsArray : undefined,
        }
      : null,
    keywords: publicTags.length ? publicTags.join(`, `) : undefined,
    headline: ghostPost.meta_title || ghostPost.title,
    url: canonical,
    datePublished: ghostPost.published_at,
    dateModified: ghostPost.updated_at,
    image: shareImage
      ? {
          "@type": `ImageObject`,
          url: shareImage,
          width: config.shareImageWidth,
          height: config.shareImageHeight,
        }
      : undefined,
    publisher: publisherLogo
      ? {
          "@type": `Organization`,
          name: config.siteTitle,
          logo: {
            "@type": `ImageObject`,
            url: publisherLogo,
            width: 60,
            height: 60,
          },
        }
      : undefined,
    description: ghostPost.meta_description || ghostPost.excerpt,
    mainEntityOfPage: {
      "@type": `WebPage`,
      "@id": config.siteUrl,
    },
  };

  return (
    <>
      <Helmet
        htmlAttributes={{ lang: config.language ? config.language : "auto" }}
      >
        <title>{ghostPost.meta_title || ghostPost.title}</title>
        {!amp && <link rel="ampHtml" href={`${canonical}/amp`} />}
        <meta
          name="description"
          content={ghostPost.meta_description || ghostPost.excerpt}
        />
        {!amp && <link rel="canonical" href={canonical} />}

        <meta property="og:site_name" content={config.siteTitle} />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={
            ghostPost.og_title || ghostPost.meta_title || ghostPost.title
          }
        />
        <meta
          property="og:description"
          content={
            ghostPost.og_description ||
            ghostPost.excerpt ||
            ghostPost.meta_description
          }
        />
        <meta property="og:url" content={canonical} />
        {config.facebookCard.appId !== "" && (
          <meta property="fb:app_id" content={config.facebookCard.appId} />
        )}
        <meta
          property="article:published_time"
          content={ghostPost.published_at}
        />
        <meta property="article:modified_time" content={ghostPost.updated_at} />
        {publicTags.map((keyword, i) => (
          <meta property="article:tag" content={keyword} key={i} />
        ))}
        {author.facebookUrl && (
          <meta property="article:author" content={author.facebookUrl} />
        )}

        <meta
          name="twitter:title"
          content={
            ghostPost.twitter_title || ghostPost.meta_title || ghostPost.title
          }
        />
        <meta
          name="twitter:description"
          content={
            ghostPost.twitter_description ||
            ghostPost.excerpt ||
            ghostPost.meta_description
          }
        />
        <meta name="twitter:url" content={canonical} />
        {author && <meta name="twitter:label1" content="Written by" />}
        {author && <meta name="twitter:data1" content={author.name} />}
        {primaryTag && <meta name="twitter:label2" content="Filed under" />}
        {primaryTag && <meta name="twitter:data2" content={primaryTag} />}

        {config.twitterCard.username && (
          <meta name="twitter:site" content={config.twitterCard.username} />
        )}
        {/* {settings.twitter && (
          <meta name="twitter:creator" content={settings.twitter} />
        )} */}
        {author.twitter && (
          <meta name="twitter:creator" content={author.twitter} />
        )}
        <script type="application/ld+json">
          {JSON.stringify(jsonLd, undefined, 4)}
        </script>
      </Helmet>
      <ImageMeta image={shareImage} />
    </>
  );
};

ArticleMetaGhost.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    published_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    meta_title: PropTypes.string,
    meta_description: PropTypes.string,
    primary_author: PropTypes.object.isRequired,
    feature_image: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        slug: PropTypes.string,
        visibility: PropTypes.string,
      })
    ),
    primaryTag: PropTypes.shape({
      name: PropTypes.string,
    }),
    og_title: PropTypes.string,
    og_description: PropTypes.string,
    twitter_title: PropTypes.string,
    twitter_description: PropTypes.string,
    excerpt: PropTypes.string.isRequired,
  }).isRequired,
  settings: PropTypes.shape({
    logo: PropTypes.object,
    title: PropTypes.string,
    twitter: PropTypes.string,
    allGhostSettings: PropTypes.object.isRequired,
    site: PropTypes.object.isRequired,
  }).isRequired,
  canonical: PropTypes.string.isRequired,
};

const ArticleMetaQuery = (props) => (
  <StaticQuery
    query={graphql`
      query GhostSettingsArticleMeta {
        allGhostSettings {
          edges {
            node {
              ...GhostSettingsFields
            }
          }
        }
        site {
          siteMetadata {
            ...SiteMetadataFields
          }
        }
      }
    `}
    render={(data) => <ArticleMetaGhost settings={data} {...props} />}
  />
);

export default ArticleMetaQuery;
