import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import url from "url";


const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
          siteDescription
          siteUrl
          coverUrl
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
          <div className="blog-cover cover" 
            style={{
              backgroundImage: `url(${
                siteMetadata.coverUrl ? url.resolve(siteMetadata.siteUrl, siteMetadata.coverUrl) : "none"
              })`,
            }}>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
