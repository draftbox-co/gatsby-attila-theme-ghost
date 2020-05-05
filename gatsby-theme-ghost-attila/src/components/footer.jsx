import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import rssLogo from "../images/rss.svg";

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      ghostSettings {
        title
        codeinjection_foot
      }
    }
  `);
  return (
    <>
      <div className="nav-footer">
        <nav className="nav-wrapper">
          <span className="nav-copy">
            {data.ghostSettings.title} &copy; {new Date().getFullYear()}
          </span>

          <div className="nav-footer-links">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a href="/sitemap.xml">Sitemap</a>
              </li>
              <li>
                <a href="/rss">RSS</a>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* <span className="nav-credits">
            Made with DraftBox &bull;{" "}
            <a href="/rss">
              RSS <img style={{height: '10px'}} src={rssLogo} alt="" />
            </a>
          </span> */}
        </nav>
        <hr />
        <div>
          <ul className="credits">
            <li>
              <a href="https://draftbox.co" target="_blank" rel="noopener norefferer">
                Published With DraftBox
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Footer;
