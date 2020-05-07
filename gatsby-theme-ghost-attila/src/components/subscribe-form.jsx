import React from "react";
import { useState } from "react";
import { useForm } from "../hook/useForm";
import { useStaticQuery, graphql } from "gatsby";

const SubscribeForm = () => {

  const data = useStaticQuery(graphql`
    query {
      allGhostSettings {
        edges {
          node {
            logo
            title
            twitter
            facebook
            cover_image
            description
            navigation {
              label
              url
            }
          }
        }
      }
    }
  `);

  const {
    allGhostSettings: { edges }
  } = data;

  const siteSettings = edges[0].node;
  const [{ handleSubmit, submitting, succeeded }] = useForm(
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
          <h1 className="subscribe-title">You’ve successfully subscribed to {siteSettings.title}</h1>
        )}
        {!succeeded && (
          <>
            <h1 className="subscribe-title">Subscribe to {siteSettings.title}</h1>
            <p className="subscribe-description">
                Get the latest posts delivered right to your inbox.
            </p>
            <div>
            <label className="hidden" htmlFor="email">Email</label>
              <input
                name="email"
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="hello@example.com"
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
