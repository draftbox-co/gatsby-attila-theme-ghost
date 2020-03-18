import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
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
          {data.ghostPost.localFeatureImage && (
            <figure className="post-image">
              {/* <amp-img
                src={data.ghostPost.localFeatureImage.childImageSharp.fluid.src}
                width="600"
                height="400"
                layout="responsive"
                class="i-amphtml-element i-amphtml-layout-responsive i-amphtml-layout-size-defined i-amphtml-layout"
                i-amphtml-layout="responsive"
                style="--loader-delay-offset:134ms !important;"
                i-amphtml-auto-lightbox-visited=""
                lightbox="i-amphtml-auto-lightbox-0"
                on="tap:amp-lightbox-gallery.activate"
              >
                <i-amphtml-sizer style="padding-top: 66.6667%;"></i-amphtml-sizer>
                >
              </amp-img> */}
              <img
                src={data.ghostPost.localFeatureImage.childImageSharp.fluid.src}
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
      }
    }
  }
`;
