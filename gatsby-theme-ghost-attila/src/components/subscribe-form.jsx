import React from "react";
import { useState } from "react";
import { useForm } from "../hook/useForm";
import { useStaticQuery, graphql } from "gatsby";

const SubscribeForm = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteTitle
          subscribeWidget {
            visible
            title
            helpText
            successMessage
          }
        }
      }
    }
  `);

  // const {
  //   allGhostSettings: { edges },
  // } = data;

  //const siteSettings = edges[0].node;
  const subscribeWidget = data.site.siteMetadata.subscribeWidget;
  const siteTitle = data.site.siteMetadata.siteTitle;
  const [{ handleSubmit, submitting, succeeded }] = useForm("subscribe");

  const [email, setEmail] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit({ email });
  };

  return subscribeWidget.visible ? (
    <div className="subscribe-form" id="subscribe">
      <form onSubmit={(e) => onSubmit(e)}>
        {succeeded && (
          <h1
            className="subscribe-title"
            dangerouslySetInnerHTML={{
              __html: `${
                subscribeWidget.successMessage
                  ? subscribeWidget.successMessage
                  : "You’ve successfully subscribed to " + siteTitle + "."
              }`,
            }}
          ></h1>
        )}
        {!succeeded && (
          <>
            <h1 className="subscribe-title">
              {subscribeWidget.title
                ? subscribeWidget.title
                : "Subscribe to " + siteTitle}
            </h1>
            <p className="subscribe-description">
              {subscribeWidget.helpText
                ? subscribeWidget.helpText
                : `Get the latest posts delivered right to your inbox.`}
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
  ) : (
    <div></div>
  );
};

export default SubscribeForm;
