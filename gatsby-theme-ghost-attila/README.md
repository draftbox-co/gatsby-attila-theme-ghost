[![Draftbox](https://res.cloudinary.com/thinkcdnimages/image/upload/v1589291053/Draftbox/draftbox-for-github.svg)](https://draftbox.co)

# gatsby-attila-theme-ghost

A Gatsby theme plugin for creating blogs from headless Ghost CMS. 

Turn your Ghost blog into a lightning fast static website. This Gatsby theme is a frontend replacement of the Ghost handlebars engine featuring the standard Casper 3 skin and functionality. All content is sourced from a headless Ghost CMS.


> This theme is being used at [Draftbox](https://draftbox.co). Get lightning fast, secure front-end for your WordPress or Ghost blog, in 5 minutes or less, without coding. For our fellow devs, we also provide code export feature.

## Demo

Play with the [Demo](https://ghost-attila-preview.draftbox.co/) to get a first impression.


## Features

- Ghost Attila skin and functionality
- SEO optimized
- Fully responsive
- Gatsby images
- Styled 404 page
- RSS Feed
- AMP Pages
- Sitemap
- Contact Form
- Subscribe Form
- Social Sharing
- Composable and extensible


## Installation

> Head over to the [starter repo](https://github.com/draftbox-co/gatsby-attila-theme-starter) to get up and running quickly! 


If you want to add this blog theme to an existing site, follow these instructions:

1. Install the blog theme

    ```bash
    yarn add @draftbox-co/gatsby-theme-ghost-attila
    # or
    npm install @draftbox-co/gatsby-theme-ghost-attila --save
    ```

2. Add the following configuration to your `gatsby-config.js` file

    ```js
    // gatsby-config.js
    module.exports = {
    plugins: [
        {
        resolve: `@draftbox-co/gatsby-theme-ghost-attila`,
        options: {
            siteConfig: {
            siteUrl: `https://your-bog.com`,
            postsPerPage: 12,
            siteTitleMeta: `Gatsby Frontend powered by headless Ghost CMS`,
            siteDescriptionMeta: `Turn your Ghost blog into a lightning fast static website with Gatsby`, 
            shareImageWidth: 1000,
            shareImageHeight: 523,
            shortTitle: `Ghost`,
            siteIcon: `favicon.png`,
            backgroundColor: `#e9e9e9`,
            themeColor: `#15171A`,
            },
            ghostConfig: {
                "development": {
                    "apiUrl": "http://localhost:2368",
                    "contentApiKey": "9fcfdb1e5ea5b472e2e5b92942",
                },
                "production": {
                    "apiUrl": "https://your-ghost-cms.com",
                    "contentApiKey": "9fcfdb1e5ea5b472e2e5b92942",
                },
            },
          },
       },
    ],  
    }
    ```

3. Update siteConfig

    In the configuration shown above, the most important fields to be changed are `siteUrl`, `siteTitleMeta` and      `siteDescriptionMeta`. Update at least those to fit your needs. Also make sure your `favicon.png` can be found in folder `static` of your working directory.

4. Ghost Content API Keys

    Change the `apiUrl` value to the URL of your Ghost CMS site. Next, update the `contentApiKey` value to a key associated with the Ghost CMS site. A key can be provided by creating an integration within Ghost Admin. Navigate to Integrations and click "Add new integration". Name the integration appropriately and click create.



## Running

Start the development server. You now have a Gatsby site pulling content from headless Ghost.

```bash
gatsby develop
```


## Optimizing

You can disable the default Ghost Handlebars Theme front-end by enabling the `Make this site private` flag within your Ghost settings. This enables password protection in front of the Ghost install and sets `<meta name="robots" content="noindex" />` so your Gatsby front-end becomes the source of truth for SEO.

## Authors
- Arun Priyadarshi ([@Gunnerforlife](https://github.com/Gunnerforlife)) – [Draftbox](https://draftbox.co)
- Keyur Raval ([@thandaanda](https://github.com/thandaanda)) – [Draftbox](https://draftbox.co)
- Shyam Lohar ([@shyamlohar](https://github.com/shyamlohar)) – [Draftbox](https://draftbox.co)
- Tanmay Desai ([@tanmaydesai89](https://github.com/tanmaydesai89)) – [Draftbox](https://draftbox.co)

## Contributions
PRs are welcome! Consider contributing to this project if you are missing feature that is also useful for others.

# Copyright & License

Copyright (c) 2020 [Draftbox](https://draftbox.co) - Released under the [MIT license](LICENSE).
