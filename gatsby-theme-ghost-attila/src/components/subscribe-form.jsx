import React from "react";
import { useState } from "react";
import { useForm } from "../hook/useForm";

const SubscribeForm = () => {
  const [{ handleSubmit, submitting, succeeded, errors }] = useForm(
    "subscribe"
  );

  const [email, setEmail] = useState();

  const onSubmit = e => {
    e.preventDefault();
    handleSubmit({ email });
  };

  return (
    <div className="subscribe-form">
      <form onSubmit={e => onSubmit(e)}>
        {succeeded && (
          <h1 className="subscribe-title">Subscribed successfully</h1>
        )}
        {!succeeded && (
          <>
            <h1 className="subscribe-title">Subscribe for new updates</h1>
            <p className="subscribe-description">
              Subscribe to my email newsletter to receive useful articles and
              special offers. <br /> This monthly email is sent out on the first
              of every month.
            </p>
            <div>
              <input
                onChange={e => setEmail(e.target.value)}
                required
                id="email"
                type="email"
              />
            </div>
            <button disabled={submitting} type="submit">
              {submitting ? "Subscribing..." : "Subscribe"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default SubscribeForm;
