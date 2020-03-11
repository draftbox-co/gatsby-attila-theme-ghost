import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Layout from "../components/Layout";

const Tags = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      ghostTag(slug: { eq: "getting-started" }) {
        postCount
        slug
        name
        description
        feature_image
      }
    }
  `);

  return (
    <>
      <Layout>
        <header className="blog-header">
          <div className="inner">
            <div className="archive archive-tag box archive-box">
              <span className="archive-info">
                <span className="archive-type">Topic</span>
                <span className="archive-count">
                  {data.ghostTag.postCount} Posts
                </span>
              </span>
              <h2 className="archive-title">{data.ghostTag.name}</h2>
              {data.ghostTag.description && (
                <span className="archive-description">
                  {data.ghostTag.description}
                </span>
              )}
            </div>
          </div>
        </header>
      </Layout>
    </>
  );
};

export default Tags;
