import React from "react";
import Layout from "../components/Layout";
import ContactForm from "../components/contact-form";
import ContactMeta from "./../components/meta/ContactMeta";
const Contact = ({location}) => {

  return (
    <Layout>
      <ContactMeta location={location}/>
      <ContactForm />
    </Layout>
  );
};

export default Contact;
