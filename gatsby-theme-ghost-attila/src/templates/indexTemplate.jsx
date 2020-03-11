import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PostCard from "../components/post-card";
import Header from "../components/header";
import Pagination from "../components/pagination";
import { MetaData } from "../components/meta";

const IndexTemplate = ({ data, pageContext, location }) => {
  return (
    <Layout>
      <MetaData data={data} location={location} type="article" />
      <Header />
      {data.allGhostPost.edges.map(({ node }, i) => {
        return <PostCard key={i} post={node} />;
      })}
      <div>
        <Pagination pageContext={pageContext} />
      </div>
    </Layout>
  );
};

export default IndexTemplate;

export const pageQuery = graphql`
  query($limit: Int!, $skip: Int!) {
    allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
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
          reading_time
          slug
        }
      }
    }
  }
`;
