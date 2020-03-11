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
    }
  `);

  const {
    allGhostSettings: { edges }
  } = data;

  const siteSettings = edges[0].node;
  return (
    <>
      <header className="blog-header">
        <div className="inner">
          <div className="box blog-box">
            <h1 className="blog-name">{siteSettings.title}</h1>
            <span className="blog-description">{siteSettings.description}</span>
          </div>
          <div className="blog-cover cover"></div>
        </div>
      </header>
    </>
  );
};

export default Header;
