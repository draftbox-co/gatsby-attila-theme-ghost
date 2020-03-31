import React, { useState, SyntheticEvent } from "react";
import Layout from "../components/Layout";
import { useForm } from "../hook/useForm";
import ContactForm from "../components/contact-form";

const Contact = () => {
  const [submitting, setSubmitting] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [submitError, setSubmitError] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [{ handleSubmit: submitForm, test }] = useForm("contact");

  const handleSubmit = e => {
    setSubmitting(true);
    e.preventDefault();
    console.log(test, formValues, "form values");
    submitForm("me hu done");
  };

  const handleChange = (target, value) => {
    console.log(target, value);
    switch (target) {
      case "name":
        setFormValues({ ...formValues, name: value });
        break;
      case "email":
        setFormValues({ ...formValues, email: value });
        break;
      case "message":
        setFormValues({ ...formValues, message: value });
        break;
    }
  };

  return (
    <Layout>
      <ContactForm />
    </Layout>
  );
};

export default Contact;
