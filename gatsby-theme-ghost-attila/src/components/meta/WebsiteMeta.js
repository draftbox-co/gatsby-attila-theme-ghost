import React from 'react'
import Helmet from "react-helmet"
import PropTypes from 'prop-types'
//import _ from 'lodash'
import { StaticQuery, graphql } from 'gatsby'
import url from 'url'

//import ImageMeta from './ImageMeta'

const WebsiteMeta = ({ data, settings, canonical, title, description, image, type }) => {
    const config = settings.site.siteMetadata
    settings = settings.allGhostSettings.edges[0].node
    const publisherLogo = url.resolve(config.siteUrl, config.logoUrl)
    let shareImage = config.coverUrl || config.facebookCard.imageUrl || config.twitterCard.imageUrl;
    shareImage = shareImage ? url.resolve(config.siteUrl, shareImage) : null;

    description = description || data.meta_description || data.description || config.siteDescriptionMeta || settings.description
    title = settings.title;

    const jsonLd = {
        "@context": `https://schema.org/`,
        "@type": type,
        url: canonical,
        image: shareImage ?
            {
                "@type": `ImageObject`,
                url: shareImage,
                width: config.shareImageWidth,
                height: config.shareImageHeight
            } : undefined,
        publisher: {
            "@type": `Organization`,
            name: config.siteTitle,
            logo: {
                "@type": `ImageObject`,
                url: publisherLogo,
                width: 60,
                height: 60,
            },
        },
        mainEntityOfPage: {
            "@type": `WebPage`,
            "@id": config.siteUrl,
        },
        description: config.siteDescription,
    }

    return (
        // <>
        //     <Helmet htmlAttributes={{"lang": settings.lang ? settings.lang : "auto"}}>
        //         <title>{title}</title>
        //         <meta name="description" content={description} />
        //         <link rel="canonical" href={canonical} />
        //         <meta property="og:site_name" content={settings.title} />
        //         <meta property="og:type" content="website" />
        //         <meta property="og:title" content={title} />
        //         <meta property="og:description" content={description} />
        //         <meta property="og:url" content={canonical} />
        //         <meta name="twitter:title" content={title} />
        //         <meta name="twitter:description" content={description} />
        //         <meta name="twitter:url" content={canonical} />
        //         {settings.twitter && <meta name="twitter:site" content={`https://twitter.com/${settings.twitter.replace(/^@/, ``)}/`} />}
        //         {settings.twitter && <meta name="twitter:creator" content={settings.twitter} />}
        //         <script type="application/ld+json">{JSON.stringify(jsonLd, undefined, 4)}</script>
        //     </Helmet>
        //     <ImageMeta image={shareImage} />
        //twitter/facebook -> meta -> siteTitle
        //images - only if it exists
        // </>
        <>
            <Helmet htmlAttributes={{"lang": config.language || "auto"}}>
                <title>{config.metadata.title || config.siteTitle}</title>
                <meta name="description" content={config.metadata.description || config.siteDescription} />
                <link rel="canonical" href={canonical} />

                <meta property="og:site_name" content={config.siteTitle} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={config.facebookCard.title || config.metadata.title || config.siteTitle} />
                <meta property="og:description" content={config.facebookCard.description || config.metadata.description || config.siteDescription} />
                <meta property="og:url" content={canonical} />
                {config.facebookCard.imageUrl !== '' &&  <meta property="og:image" content={`${config.siteUrl}/${config.facebookCard.imageUrl}`} />}
                {config.facebookCard.width !== '' &&  <meta property="og:image:width" content={config.facebookCard.width} />}
                {config.facebookCard.height !== '' &&  <meta property="og:image:height" content={config.facebookCard.height} />}
                {config.facebookCard.appId !== '' &&  <meta property="fb:app_id" content={config.facebookCard.appId} />}
                
                <meta name="twitter:title" content={config.twitterCard.title || config.metadata.title || config.siteTitle} />
                <meta name="twitter:description" content={config.twitterCard.description || config.metadata.description || config.siteDescription} />
                <meta name="twitter:url" content={canonical} />
                {config.twitterCard.username && <meta name="twitter:site" content={config.twitterCard.username} />}
                {config.twitterCard.username && <meta name="twitter:creator" content={config.twitterCard.username} />}
                {config.twitterCard.imageUrl && <meta name="twitter:image" content={url.resolve(config.siteUrl, config.twitterCard.imageUrl)} />}
                {config.twitterCard.imageUrl && <meta name="twitter:card" content="summary_large_image" />}
                
                <script type="application/ld+json">{JSON.stringify(jsonLd, undefined, 4)}</script>
            </Helmet>
            {/* <ImageMeta image={shareImage} /> */}
        </>
    )
}

WebsiteMeta.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string,
        meta_title: PropTypes.string,
        meta_description: PropTypes.string,
        name: PropTypes.string,
        feature_image: PropTypes.string,
        description: PropTypes.string,
        bio: PropTypes.string,
        profile_image: PropTypes.string,
    }).isRequired,
    settings: PropTypes.shape({
        logo: PropTypes.object,
        description: PropTypes.string,
        title: PropTypes.string,
        twitter: PropTypes.string,
        allGhostSettings: PropTypes.object.isRequired,
        site: PropTypes.object.isRequired,
        iconUrl: PropTypes.string,
    }).isRequired,
    canonical: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    type: PropTypes.oneOf([`WebSite`, `Series`]).isRequired,
}

const WebsiteMetaQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettingsWebsiteMeta {
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
        render={data => <WebsiteMeta settings={data} {...props} />}
    />
)

export default WebsiteMetaQuery
