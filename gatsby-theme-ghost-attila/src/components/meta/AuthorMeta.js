import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
//import _ from 'lodash'
import url from "url"
import { StaticQuery, graphql } from 'gatsby'

import ImageMeta from './ImageMeta'
import getAuthorProperties from './getAuthorProperties'

const AuthorMeta = ({ data, settings, canonical }) => {
    const config = settings.site.siteMetadata
    settings = settings.allGhostSettings.edges[0].node

    const author = getAuthorProperties(data)
    const shareImage = author.image
    ? url.resolve(config.siteUrl, author.image)
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
    const title = `${data.name} - ${config.siteTitle}`
    const description = data.bio || config.siteDescription || settings.description

    const jsonLd = {
        "@context": `https://schema.org/`,
        "@type": `Person`,
        name: data.name,
        sameAs: author.sameAsArray ? author.sameAsArray : undefined,
        url: canonical,
        image: shareImage ? {
            "@type": `ImageObject`,
            url: shareImage,
            width: config.shareImageWidth,
            height: config.shareImageHeight,
        } : undefined,
        mainEntityOfPage: {
            "@type": `WebPage`,
            "@id": config.siteUrl,
        },
        description,
    }

    return (
        <>
            <Helmet htmlAttributes={{"lang": config.language ? config.language : "auto"}}>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={canonical} />
                <meta property="og:site_name" content={config.siteTitle} />
                <meta property="og:type" content="profile" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={canonical} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:url" content={canonical} />
                {config.twitterCard.username && <meta name="twitter:site" content={`https://twitter.com/${config.twitterCard.username.replace(/^@/, ``)}/`} />}
                {config.twitterCard.username && <meta name="twitter:creator" content={config.twitterCard.usernamer} />}
                <script type="application/ld+json">{JSON.stringify(jsonLd, undefined, 4)}</script>
            </Helmet>
            <ImageMeta image={shareImage} />
        </>
    )
}

AuthorMeta.propTypes = {
    data: PropTypes.shape({
        name: PropTypes.string,
        bio: PropTypes.string,
        profile_image: PropTypes.string,
        website: PropTypes.string,
        twitter: PropTypes.string,
        facebook: PropTypes.string,
    }).isRequired,
    settings: PropTypes.shape({
        title: PropTypes.string,
        twitter: PropTypes.string,
        description: PropTypes.string,
        allGhostSettings: PropTypes.object.isRequired,
        site: PropTypes.object.isRequired,
    }).isRequired,
    canonical: PropTypes.string.isRequired,
}

const AuthorMetaQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettingsAuthorMeta {
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
        render={data => <AuthorMeta settings={data} {...props} />}
    />
)

export default AuthorMetaQuery
