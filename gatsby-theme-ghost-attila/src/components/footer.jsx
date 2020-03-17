import React from "react";
import { useStaticQuery, graphql } from "gatsby";

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
          Published with <a href="https://ghost.org">Ghost</a> &bull; Theme{" "}
          <a href="https://github.com/zutrinken/attila">Attila</a>
        </span>
      </nav>
    </div>
    </>
  );
};

export default Footer;
