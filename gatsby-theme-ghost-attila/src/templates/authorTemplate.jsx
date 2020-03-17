import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PostCard from "../components/post-card";
import Pagination from "../components/pagination";

const AuthorTemplate = ({ data, pageContext }) => {
  return (
    <Layout>
      <header className="blog-header">
        <div className="inner">
          <div className="archive archive-author box archive-box">
            <span className="archive-info">
              <span className="archive-type">Author</span>
              {/* <span className="archive-count">{{plural ../pagination.total empty=(t "No Posts") singular=(t "% Post") plural=(t "% Posts")}}</span> */}
            </span>
            <figure className="archive-avatar avatar">
              {data.ghostAuthor.profile_image && (
                <img
                  src={data.ghostAuthor.profile_image}
                  alt={data.ghostAuthor.name}
                />
              )}
            </figure>
            <h2 className="archive-title">{data.ghostAuthor.name}</h2>

            {data.ghostAuthor.bio && (
              <span className="archive-description">
                {data.ghostAuthor.bio}
              </span>
            )}

            <span className="archive-links">
              {data.ghostAuthor.website && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data.ghostAuthor.website}
                  title="Website"
                >
                  <i className="icon icon-globe"></i>
                  <span>"Website</span>
                </a>
              )}

              {data.ghostAuthor.twitter && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data.ghostAuthor.twitter}
                  title="Twitter"
                >
                  <i className="icon icon-twitter"></i>
                  <span>Twitter</span>
                </a>
              )}
              {data.ghostAuthor.facebook && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data.ghostAuthor.facebook}
                  title="Facebook}"
                >
                  <i className="icon icon-facebook"></i>
                  <span>Facebook</span>
                </a>
              )}
            </span>
          </div>
        </div>
      </header>
      <div id="index" className="container">
        <main className="content" role="main">
          {data.allGhostPost.edges.map(({ node }, i) => {
            return <PostCard key={i} post={node} />;
          })}
        </main>
      </div>
      <Pagination pageContext={pageContext} />
    </Layout>
  );
};

export default AuthorTemplate;

export const pageQuery = graphql`
  query GhostAuthorQuery($slug: String!, $limit: Int!, $skip: Int!) {
    ghostAuthor(slug: { eq: $slug }) {
      name
      bio
      facebook
      twitter
      website
      profile_image
      slug
    }
    allGhostPost(
      sort: { order: DESC, fields: [published_at] }
      filter: { authors: { elemMatch: { slug: { eq: $slug } } } }
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
