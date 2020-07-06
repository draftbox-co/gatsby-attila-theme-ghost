import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";

const Navbar = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
          apiUrl
          logoUrl
          header {
            navigation {
              url
              label
            }
          }
          socialLinks {
            twitter
            facebook
            instagram
            linkedin
            github
          }
        }
      }
    }
  `);

  const {
    site: { siteMetadata },
  } = data;

  //const siteSettings = edges[0].node;
  const siteUrl = siteMetadata.siteUrl;
  const apiUrl = siteMetadata.apiUrl;
  const navigation = siteMetadata.header.navigation;
  const socialLinks = siteMetadata.socialLinks;
  return (
    <>
      <div className="nav-header">
        <nav className="nav-wrapper">
          <span className="logo">
            {siteMetadata.logoUrl && (
              <Link
                to="/"
                title={siteMetadata.siteTitle}
                aria-label={siteMetadata.siteTitle}
              >
                <img src={`/${siteMetadata.logoUrl}`} alt="" />
              </Link>
            )}
          </span>
          <ul role="navigation" aria-label="Navigation">
            {navigation.map(({ label, url }, i) => {
              return url.startsWith("/") ||
                url.startsWith(siteUrl) ||
                url.startsWith(apiUrl) ? (
                <li key={i} role="presentation">
                  <Link
                    to={`${
                      url.startsWith("/")
                        ? url
                        : url.startsWith(siteUrl)
                        ? url.slice(siteUrl.length, url.length)
                        : url.slice(apiUrl.length, url.length)
                    }`}
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
          </ul>
          <ul className="side-nav side-nav-social">
            {socialLinks.facebook && (
              <li className="nav-facebook">
                <a
                  href={socialLinks.facebook}
                  title="Facebook"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <i className="icon icon-facebook"></i>
                  <span>Facebook</span>
                </a>
              </li>
            )}
            {socialLinks.twitter && (
              <li className="nav-twitter">
                <a
                  href={socialLinks.twitter}
                  title="Twitter"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <i className="icon icon-twitter"></i>
                  <span>Twitter</span>
                </a>
              </li>
            )}
            {socialLinks.instagram && (
              <li className="nav-twitter">
                <a
                  href={socialLinks.instagram}
                  title="Instagram"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <i className="icon icon-instagram"></i>
                  <span>Instagram</span>
                </a>
              </li>
            )}
            {socialLinks.linkedin && (
              <li className="nav-twitter">
                <a
                  href={socialLinks.linkedin}
                  title="LinkedIn"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <i className="icon icon-linkedin"></i>
                  <span>LinkedIn</span>
                </a>
              </li>
            )}
            {socialLinks.github && (
              <li className="nav-twitter">
                <a
                  href={socialLinks.github}
                  title="GitHub"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <i className="icon icon-github-circled"></i>
                  <span>GitHub</span>
                </a>
              </li>
            )}
          </ul>
        </nav>
        <div className="nav-wrapper-control">
          <div className="inner">
            <a
              href="#0"
              className="nav-menu"
              onClick={(e) => document.body.classList.toggle("menu-active")}
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
