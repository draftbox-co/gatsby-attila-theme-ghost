import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      allGhostSettings {
        edges {
          node {
            logo
            title
            twitter
            facebook
            cover_image
            description
            navigation {
              label
              url
            }
          }
        }
      }
      site {
        siteMetadata {
          siteTitle
          siteUrl
          apiUrl
          footer {
            copyright
            navigation {
              label
              url
            }
          }
        }
      }
    }
  `);

  const {
    site: { siteMetadata }
  } = data;

  //const siteSettings = edges[0].node;
  return (
    <>
      <header className="blog-header">
        <div className="inner">
          <div className="box blog-box">
            <h1
              className="blog-name break-words"
              dangerouslySetInnerHTML={{ __html: siteMetadata.siteTitle }}
            ></h1>
            <span
              className="blog-description break-words"
              dangerouslySetInnerHTML={{ __html: siteMetadata.siteDescription }}
            ></span>
          </div>
          <div className="blog-cover cover"></div>
        </div>
      </header>
    </>
  );
};

export default Header;
