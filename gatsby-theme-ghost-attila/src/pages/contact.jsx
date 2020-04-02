import React, { useState, SyntheticEvent } from "react";
import Layout from "../components/Layout";
import { useForm } from "../hook/useForm";
import ContactForm from "../components/contact-form";

const Contact = () => {

  return (
    <Layout>
      <ContactForm />
    </Layout>
  );
};

export default Contact;
