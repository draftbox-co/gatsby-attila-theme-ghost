import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";

const Navbar = () => {
  const data = useStaticQuery(graphql`
    query {
      allGhostSettings {
        edges {
          node {
            logo
            twitter
            facebook
            cover_image
            navigation {
              label
              url
            }
          }
        }
      }
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `);

  const {
    allGhostSettings: { edges },
    site: { siteMetadata }
  } = data;

  const siteSettings = edges[0].node;
  const siteUrl = siteMetadata.siteUrl;

  return (
    <>
      <div className="nav-header">
        <nav className="nav-wrapper">
          <span className="logo">
            {siteSettings.logo && (
              <Link to="/">
                <img src={siteSettings.logo} alt="" />
              </Link>
            )}
          </span>
          <ul role="navigation" aria-label="Navigation">
            {siteSettings.navigation.map(({ label, url }, i) => {
              return url.startsWith("/") || url.startsWith(siteUrl) ? (
                <li key={i} role="presentation">
                  <Link
                    to={url.slice(siteUrl.length, url.length)}
                    activeClassName="active"
                  >
                    <span>{label}</span>
                  </Link>
                </li>
              ) : (
                <li key={i} role="presentation">
                  <a href={url} target="_blank" rel="noreferrer noopener">
                    {label}
                  </a>
                </li>
              );
            })}
            <li role="presentation">
              <Link to="/contact">
                <span>Contact us</span>
              </Link>
            </li>
          </ul>
          <ul className="side-nav">
            <li className="nav-facebook">
              <a
                href={`https://facebook.com/${siteSettings.facebook}`}
                title="Facebook"
                target="_blank"
                rel="noreferrer noopener"
              >
                <i className="icon icon-facebook"></i>
                <span>Facebook</span>
              </a>
            </li>
            <li className="nav-twitter">
              <a
                href={`https://twitter.com/${siteSettings.twitter}`}
                title="Twitter"
                target="_blank"
                rel="noreferrer noopener"
              >
                <i className="icon icon-twitter"></i>
                <span>Twitter</span>
              </a>
            </li>
          </ul>
        </nav>
        <div className="nav-wrapper-control">
          <div className="inner">
            <a
              className="nav-menu"
              onClick={e => document.body.classList.toggle("menu-active")}
            >
              <i className="icon icon-menu"></i>Menu
            </a>
          </div>
        </div>
      </div>
      <div className="nav-close"></div>
    </>
  );
};

export default Navbar;
