import React, { useState } from "react";
import { useForm } from "../hook/useForm";
import { useStaticQuery, graphql } from "gatsby";

const ContactForm = () => {

  const {
    site: { siteTitle, siteMetadata: {contactWidget} }
  } = useStaticQuery(graphql`
    query {
      ghostSettings {
        title
      }
      site {
        siteMetadata {
          siteTitle
          contactWidget {
            title
            successMessage
          }
        }
      }
    }
  `);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [{ handleSubmit: submitForm, submitting, succeeded }] = useForm(
    "contact"
  );

  const handleSubmit = e => {
    e.preventDefault();
    submitForm(formValues);
  };

  const handleChange = (target, value) => {
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
      default:
        break;
    }
  };

  return (
    <div className="post-header">
      <main className="content">
        <div className="inner">
          {succeeded && (
            <div className="post-title">
              {contactWidget.successMessage ? contactWidget.successMessage : `We'll get in touch with you soon.`}
            </div>
          )}
          {!succeeded && (
            <>
              <div className="post-title">
                <span dangerouslySetInnerHTML={{ __html: contactWidget.title ? contactWidget.title : `Contact ` + siteTitle }}></span>
              </div>
              <form className="form-content" onSubmit={e => handleSubmit(e)}>
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    onChange={e => handleChange(e.target.id, e.target.value)}
                    id="name"
                    type="text"
                    placeholder="Your name (optional)"
                  />
                </div>
                <br />
                <div>
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={e => handleChange(e.target.id, e.target.value)}
                    required
                    id="email"
                    type="email"
                    placeholder="Your email address"
                  />
                </div>
                <br />
                <label htmlFor="message">Message</label>
                <textarea
                  required
                  maxLength="180"
                  rows="4"
                  onChange={e => handleChange(e.target.id, e.target.value)}
                  id="message"
                  placeholder="Your message"
                />
                <br />
                <button disabled={submitting} type="submit">
                  {submitting ? "Sending..." : "Send"}
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default ContactForm;
