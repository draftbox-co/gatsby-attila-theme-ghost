import React from "react";
import "../styles/sass/style.scss";
import Navbar from "./navbar";
import Footer from "./footer";
import { ArmadaFormsProvider } from "../context/form-context";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const Layout = (props) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          language
        }
      }
    }
  `);

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: data.site.siteMetadata.language
            ? data.site.siteMetadata.language
            : "auto",
        }}
      ></Helmet>
      <ArmadaFormsProvider client={process.env.GATSBY_FORM_URL}>
        <Navbar />
        {props.children}
        <Footer />
      </ArmadaFormsProvider>
    </>
  );
};

export default Layout;
