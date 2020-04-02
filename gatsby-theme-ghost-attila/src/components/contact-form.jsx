import React, { useState } from "react";
import { useForm } from "../hook/useForm";

const ContactForm = () => {
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
      default:
        break;
    }
  };

  return (
    <div className="post-header">
      <main className="content">
        <div className="inner">
          {succeeded && (
            <div className="post-title"> Message Sent Successfully</div>
          )}
          {!succeeded && (
            <>
              <span className="post-info">
                <span className="post-type">Contact us</span>
              </span>
              <div className="post-title">Contact Us</div>
              <form className="form-content" onSubmit={e => handleSubmit(e)}>
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    onChange={e => handleChange(e.target.id, e.target.value)}
                    id="name"
                    type="text"
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
