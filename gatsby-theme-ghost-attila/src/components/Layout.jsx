import React from "react";
import "../styles/sass/style.scss";
import Navbar from "./navbar";
import Footer from "./footer";
import "prismjs/themes/prism.css";
import { ArmadaFormsProvider } from "../context/form-context";

const Layout = props => {
  return (
    <>
      <ArmadaFormsProvider client={process.env.FORM_URL}>
        <Navbar />
        {props.children}
        <Footer />
      </ArmadaFormsProvider>
    </>
  );
};

export default Layout;
