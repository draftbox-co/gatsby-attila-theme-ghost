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
      site {
        siteMetadata {
          subscribeWidget {
            title
            helpText
            successMessage
          }
        }
      }
    }
  `);

  const {
    allGhostSettings: { edges },
  } = data;

  const siteSettings = edges[0].node;
  const subscribeWidget = data.site.siteMetadata.subscribeWidget;
  const [{ handleSubmit, submitting, succeeded }] = useForm("subscribe");

  const [email, setEmail] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ email });
  };

  return (
    <div className="subscribe-form" id="subscribe">
      <form onSubmit={(e) => onSubmit(e)}>
        {succeeded && (
          <h1
            className="subscribe-title"
            dangerouslySetInnerHTML={{
              __html: `${subscribeWidget.successMessage ? subscribeWidget.successMessage : 'You’ve successfully subscribed to ' + siteSettings.title + '.'}`,
            }}
          ></h1>
        )}
        {!succeeded && (
          <>
            <h1 className="subscribe-title">
              {subscribeWidget.title ? subscribeWidget.title : "Subscribe to " + siteSettings.title}
            </h1>
            <p className="subscribe-description">
            {subscribeWidget.helpText ? subscribeWidget.helpText: `Get the latest posts delivered right to your inbox.`}
            </p>
            <div>
              <label className="hidden" htmlFor="email">
                Email
              </label>
              <input
                name="email"
                onChange={(e) => setEmail(e.target.value)}
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
