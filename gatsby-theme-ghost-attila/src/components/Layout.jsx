import React from "react";
import "../styles/sass/style.scss";
import Navbar from "./navbar";
import Footer from "./footer";
import "prismjs/themes/prism.css";
import Disqus from "./disqus";

const Layout = props => {
  return (
    <>
      <Navbar />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
