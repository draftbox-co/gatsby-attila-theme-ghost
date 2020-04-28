import React from "react";
import { useStaticQuery, graphql } from "gatsby";
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

          <span className="nav-credits">
            Made with DraftBox &bull;{" "}
            <a href="/rss">
              RSS <img style={{height: '10px'}} src={rssLogo} alt="" />
            </a>
          </span>
        </nav>
      </div>
    </>
  );
};

export default Footer;
