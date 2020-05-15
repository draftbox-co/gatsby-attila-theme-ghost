import React from "react";
import { graphql, Link } from "gatsby";
import { MetaData } from "../components/meta";

const PostTemplate = ({ data, location, pageContext }) => {
  return (
    <>
      <MetaData
        data={data}
        location={location}
        amp={pageContext.amp}
        type="article"
      />
      <header className="main-header">
        <nav className="blog-title">
          <Link to="/">{pageContext.title}</Link>
        </nav>
      </header>
      <main className="content" role="main">
        <article className="post tag-getting-started">
          <header className="post-header">
            <h1 className="post-title">{data.ghostPost.title}</h1>
            <div className="post-meta">
              <div className="post-meta-avatars">
                <p className="author">{data.ghostPost.primary_author.name}</p>
              </div>
              <time
                className="post-date"
                dateTime="{{date format='DD-MM-YYYY'}}"
              >
                {data.ghostPost.updated_at}
              </time>{" "}
            </div>
          </header>
          {data.ghostPost.localFeatureImage && data.ghostPage.localFeatureImage.childImageSharp && (
            <figure className="post-image">
              <img
                src={data.ghostPost.localFeatureImage.childImageSharp.fluid.src}
                alt={data.ghostPost.title}
              />
            </figure>
          )}
          {data.ghostPost.localFeatureImage && data.ghostPage.localFeatureImage.extension === "svg" && (
            <figure className="post-image">
              <img
                src={data.ghostPost.localFeatureImage.publicURL}
                alt={data.ghostPost.title}
              />
            </figure>
          )}
          <section
            className="post-content"
            dangerouslySetInnerHTML={{ __html: data.ghostPost.html }}
          ></section>
        </article>
      </main>
    </>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query($slug: String!) {
    ghostPost(slug: { eq: $slug }) {
      title
      html
      primary_tag {
        name
        slug
      }
      primary_author {
        name
        profile_image
        slug
      }
      updated_at(formatString: "MMMM DD YYYY")
      feature_image
      localFeatureImage {
        childImageSharp {
          fluid {
            srcSet
            src
          }
        }
        publicURL
        extension
      }
    }
  }
`;
