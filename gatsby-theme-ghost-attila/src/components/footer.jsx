import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      ghostSettings {
        title
        codeinjection_foot
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

  const navigation = data.site.siteMetadata.footer.navigation;
  const siteUrl = data.site.siteMetadata.siteUrl;
  const apiUrl = data.site.siteMetadata.apiUrl;
  const copyright = data.site.siteMetadata.footer.copyright;
  const siteTitle = data.site.siteMetadata.siteTitle;

  return (
    <>
      <div className="nav-footer">
        <nav className="nav-wrapper">
          <span className="nav-copy">
            <span
              dangerouslySetInnerHTML={{
                __html: copyright ? copyright : siteTitle,
              }}
            ></span>{" "}
            &copy; {new Date().getFullYear()}
          </span>

          <div className="nav-footer-links">
            <ul>
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
          </div>
        </nav>
        <hr />
        <div>
          <ul className="credits">
            <li>
              <a
                href="https://draftbox.co?ref=preview"
                rel="noopener noreferrer"
                target="_blank"
              >
                Published With Draftbox
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
