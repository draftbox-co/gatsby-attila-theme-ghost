import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Pagination from "../components/pagination";
import PostCard from "../components/post-card";

const TagsTemplate = ({ data, pageContext }) => {
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
                <span
                  className="archive-description break-words"
                  dangerouslySetInnerHTML={{
                    __html: data.ghostTag.description,
                  }}
                ></span>
              )}
            </div>
          </div>
        </header>
        <div id="index" className="container">
          <main className="content" role="main">
            {data.allGhostPost.edges.map(({ node }, i) => {
              return <PostCard post={node} key={i} />;
            })}
          </main>
        </div>
        <Pagination pageContext={pageContext} />
      </Layout>
    </>
  );
};

export default TagsTemplate;

export const pageQuery = graphql`
  query GhostTagQuery($slug: String!, $limit: Int!, $skip: Int!) {
    ghostTag(slug: { eq: $slug }) {
      name
      description
      postCount
    }
    allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      filter: { tags: { elemMatch: { slug: { eq: $slug } } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          uuid
          title
          url
          updated_at(formatString: "MMMM DD YYYY")
          authors {
            name
          }
          tags {
            name
            slug
          }
          excerpt
          readingTime
          slug
        }
      }
    }
  }
`;
