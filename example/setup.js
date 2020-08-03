(async () => {
  const gatsbyConfig = require("./gatsby-config");
  const fetch = require("node-fetch");
  const fs = require("fs");
  const path = require("path");

  if (gatsbyConfig.plugins.length) {
    const index = gatsbyConfig.plugins.findIndex(
      (obj) => obj.resolve === "@draftbox-co/gatsby-theme-ghost-attila"
    );
    console.log(index);
    if (index > -1) {
      const pluginOptions = gatsbyConfig.plugins[index];
      if (pluginOptions.options.ghostConfig) {
        console.log(process.argv[2]);
        const environment = process.argv[2] || "development";
        let config = {
          apiUrl: "",
          contentApiKey: "",
          version: "",
        };
        if (environment === "development") {
          config = Object.assign(
            config,
            pluginOptions.options.ghostConfig.development
          );
        }
        if (environment === "production") {
          config = Object.assign(
            config,
            pluginOptions.options.ghostConfig.production
          );
        }
        try {
          const apiUrl = `${config.apiUrl}/ghost/api/${config.version}/content/settings/?key=${config.contentApiKey}`;
          console.log(apiUrl);
          const resp = await fetch(apiUrl);
          console.log(resp.status);
          if (resp.status === 200) {
            const finalRes = await resp.json();
            console.log(finalRes);
            const siteData = finalRes.settings;
            const masterConfig = {
              subscribeWidget: {
                title: "",
                helpText: "",
                successMessage: "",
                visible: true,
              },
              footer: { copyright: "", navigation: [{ label: "", url: "" }] },
              header: { navigation: [{ label: "", url: "" }] },
              socialLinks: {
                twitter: "",
                facebook: "",
                instagram: "",
                linkedin: "",
                github: "",
                pinterest: "",
                youtube: "",
                dribbble: "",
                behance: "",
                externalLink: "",
              },
              contactWidget: { title: "", successMessage: "" },
              identity: {
                siteTitle: "",
                siteDescription: "",
                language: "en",
                postsPerPage: 10,
                logoUrl: "",
                iconUrl: "",
                coverUrl: "",
                alternateLogoUrl: "",
              },
              metadata: { title: "", description: "" },
              twitterCard: {
                title: "",
                description: "",
                imageUrl: "",
                username: "",
              },
              facebookCard: {
                title: "",
                description: "",
                imageUrl: "",
                appId: "",
                width: 1000,
                height: 523,
              },
            };
            const newSiteConfig = Object.assign({}, masterConfig);
            console.log(
              path.resolve(
                __dirname,
                "..",
                `gatsby-theme-ghost-attila`,
                "static"
              )
            );
            if (siteData.title) {
              newSiteConfig.subscribeWidget.title = `Subscribe to ${siteData.title}`;
              newSiteConfig.subscribeWidget.successMessage = `Thanks for subscribing to ${siteData.title}.`;
              newSiteConfig.subscribeWidget.helpText =
                "Get the latest posts delivered right to your inbox.";
              newSiteConfig.footer.copyright = siteData.title;
              newSiteConfig.contactWidget.title = `Contact ${siteData.title}`;
              newSiteConfig.contactWidget.successMessage = `We'll get in touch with you soon.`;
              newSiteConfig.identity.siteTitle = siteData.title || "";
              newSiteConfig.identity.siteDescription =
                siteData.description || "";
              newSiteConfig.identity.logoUrl = siteData.logo || "";
              newSiteConfig.identity.iconUrl = siteData.icon || "";
              newSiteConfig.identity.coverUrl = siteData.cover_image || "";
              newSiteConfig.identity.alternateLogoUrl = siteData.logo || "";
              newSiteConfig.metadata.title =
                siteData.meta_title || siteData.title || "";
              newSiteConfig.metadata.description =
                siteData.meta_description || siteData.description || "";
              newSiteConfig.twitterCard.title =
                siteData.twitter_title || siteData.title || "";
              newSiteConfig.twitterCard.description =
                siteData.twitter_description || siteData.description || "";
              newSiteConfig.twitterCard.imageUrl =
                siteData.twitter_image || siteData.cover_image || "";
              newSiteConfig.facebookCard.title =
                siteData.og_title || siteData.title || "";
              newSiteConfig.facebookCard.description =
                siteData.og_description || siteData.description || "";
              newSiteConfig.facebookCard.imageUrl =
                siteData.og_image || siteData.cover_image || "";

              const imageJSON = { "": "" };
              if (siteData.logo && siteData.logo !== "") {
                const resp = await fetch(siteData.logo);
                if (resp.status == 200) {
                  const bufferData = await resp.buffer();
                  const fileName = `logo${path.extname(siteData.logo)}`;
                  fs.writeFileSync(
                    path.resolve(
                      __dirname,
                      "..",
                      `gatsby-theme-ghost-attila`,
                      "static",
                      fileName
                    ),
                    bufferData
                  );
                  imageJSON[siteData.logo] = fileName;
                } else {
                  imageJSON[siteData.logo] = "";
                }
              }

              if (siteData.cover_image && siteData.cover_image !== "") {
                const resp = await fetch(siteData.cover_image);
                if (resp.status == 200) {
                  const bufferData = await resp.buffer();
                  const fileName = `coverImage${path.extname(
                    siteData.cover_image
                  )}`;
                  fs.writeFileSync(
                    path.resolve(
                      __dirname,
                      "..",
                      `gatsby-theme-ghost-attila`,
                      "static",
                      fileName
                    ),
                    bufferData
                  );
                  imageJSON[siteData.cover_image] = fileName;
                } else {
                  imageJSON[siteData.cover_image] = "";
                }
              }

              if (siteData.twitter_image && siteData.twitter_image !== "") {
                const resp = await fetch(siteData.twitter_image);
                if (resp.status == 200) {
                  const bufferData = await resp.buffer();
                  const fileName = `twitterCardImage${path.extname(
                    siteData.twitter_image
                  )}`;
                  fs.writeFileSync(
                    path.resolve(
                      __dirname,
                      "..",
                      `gatsby-theme-ghost-attila`,
                      "static",
                      fileName
                    ),
                    bufferData
                  );
                  imageJSON[siteData.twitter_image] = fileName;
                } else {
                  imageJSON[siteData.twitter_image] = "";
                }
              }

              if (siteData.og_image && siteData.og_image !== "") {
                const resp = await fetch(siteData.og_image);
                if (resp.status == 200) {
                  const bufferData = await resp.buffer();
                  const fileName = `fbCardImage${path.extname(
                    siteData.og_image
                  )}`;
                  fs.writeFileSync(
                    path.resolve(
                      __dirname,
                      "..",
                      `gatsby-theme-ghost-attila`,
                      "static",
                      fileName
                    ),
                    bufferData
                  );
                  imageJSON[siteData.og_image] = fileName;
                } else {
                  imageJSON[siteData.og_image] = "";
                }
              }
              console.log(imageJSON);
              newSiteConfig.identity.logoUrl =
                imageJSON[newSiteConfig.identity.logoUrl];
              newSiteConfig.identity.coverUrl =
                imageJSON[newSiteConfig.identity.coverUrl];
              newSiteConfig.identity.alternateLogoUrl =
                imageJSON[newSiteConfig.identity.alternateLogoUrl];
              newSiteConfig.twitterCard.imageUrl =
                imageJSON[newSiteConfig.twitterCard.imageUrl];
              newSiteConfig.facebookCard.imageUrl =
                imageJSON[newSiteConfig.facebookCard.imageUrl];
              const finalConfig = Object.assign(
                {},
                pluginOptions.options.siteConfig,
                siteConfig,
                {
                  metadata: newSiteConfig.metadata,
                  twitterCard: newSiteConfig.twitterCard,
                  facebookCard: newSiteConfig.facebookCard,
                },
                newSiteConfig.identity
              );
              console.log("new json", JSON.stringify(finalConfig, null, 2));
              pluginOptions.options.siteConfig = finalConfig;
              gatsbyConfig.plugins[index] = pluginOptions;
              fs.writeFileSync(
                path.join(__dirname, "gatsby-config.js"),
                `module.exports = ${JSON.stringify(gatsbyConfig, null, 2)}`
              );
              console.log("done");
            }
          } else {
            console.error("Config is invalid");
          }
        } catch (err) {
          console.log(err);
          console.error("Config is invalid");
        }
      } else {
        console.error("Theme plugin option doesn't exists");
      }
    } else {
      console.error("Theme plugin doesn't exists");
    }
  } else {
    console.error("Empty plugin array");
  }
})();
