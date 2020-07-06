module.exports = {
  plugins: [
    {
      resolve: `@draftbox-co/gatsby-theme-ghost-attila`,
      options: {
        siteConfig: {
          siteUrl: "https://ghost-attila-preview.draftbox.co",
          postsPerPage: 10,
          siteTitleMeta: "Built with Draftbox",
          siteDescriptionMeta:
            "Lightning fast, secure front-end for your WordPress or Ghost blog, without coding.",
          shareImageWidth: 1000,
          shareImageHeight: 523,
          shortTitle: "Built with Draftbox",
          siteIcon: "favicon.png",
          backgroundColor: "#e9e9e9",
          themeColor: "#15171A",
          apiUrl: "https://ghost.theasdfghjkl.com",
          subscribeWidget: {
            title: "Subscribe to Built with Draftbox",
            helpText: "Get the latest posts delivered right to your inbox.",
            successMessage: "Thanks for subscribing to Built with Draftbox.",
          },
          header: {
            navigation: [
              {
                label: "Home",
                url: "https://ghost-attila-preview.draftbox.co/",
              },
              {
                label: "Contact",
                url: "https://ghost-attila-preview.draftbox.co/contact",
              },
            ],
          },
          footer: {
            copyright: "Built with Draftbox",
            navigation: [
              {
                label: "Home",
                url: "https://ghost-attila-preview.draftbox.co/",
              },
              {
                label: "Sitemap",
                url: "https://ghost-attila-preview.draftbox.co/sitemap.xml",
              },
              {
                label: "RSS",
                url: "https://ghost-attila-preview.draftbox.co/rss.xml",
              },
              {
                label: "Contact",
                url: "https://ghost-attila-preview.draftbox.co/contact",
              },
            ],
          },
          socialLinks: {
            twitter: "https://twitter.com/@DraftboxHQ",
            facebook: "",
            instagram: "",
            linkedin: "",
            github: "",
          },
          contactWidget: {
            title: "Contact Built with Draftbox",
            successMessage: "We’ll get in touch with you soon.",
          },
          metadata: {
            title: "Built with Draftbox",
            description:
              "Lightning fast, secure front-end for your WordPress or Ghost blog, without coding. Draftbox is a new-age blogging platform for everyone, built on Gatsby.",
          },
          twitterCard: {
            title: "Built with Draftbox",
            description:
              "Lightning fast, secure front-end for your WordPress or Ghost blog, without coding. Draftbox is a new-age blogging platform for everyone, built on Gatsby.",
            imageUrl: "twitterImage.png",
            username: "@DraftboxHQ",
          },
          facebookCard: {
            title: "Built with Draftbox",
            description:
              "Lightning fast, secure front-end for your WordPress or Ghost blog, without coding. Draftbox is a new-age blogging platform for everyone, built on Gatsby.",
            imageUrl: "facebookImage.png",
            appId: "2391725224459953",
            width: 1000,
            height: 523,
          },
          siteTitle: "Built with Draftbox",
          siteDescription:
            "Lightning fast, secure front-end for your WordPress or Ghost blog, without coding.",
          language: "en",
          logoUrl: "logo.svg",
          iconUrl:
            "https://ghost.theasdfghjkl.com/content/images/2020/05/draftbox-colored-icon.png",
          coverUrl: "cover.png",
          alternateLogoUrl: "alternateLogo.svg",
        },
        ghostConfig: {
          development: {
            apiUrl: "https://ghost.theasdfghjkl.com",
            contentApiKey: "3d17fad3efaa911df1ed577638",
            version: "v3",
          },
          production: {
            apiUrl: "https://ghost.theasdfghjkl.com",
            contentApiKey: "3d17fad3efaa911df1ed577638",
            version: "v3",
          },
        },
      },
    },
  ],
};
