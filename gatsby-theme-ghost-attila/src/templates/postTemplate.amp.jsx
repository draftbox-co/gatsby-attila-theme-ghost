import React from "react";
import { graphql, Link } from "gatsby";
// import Layout from "../components/Layout";
import { useEffect } from "react";
import Helmet from "react-helmet";
import { MetaData } from "../components/meta";

import './../amp-styles/post.amp.css';

const PostTemplate = ({ data, location, pageContext }) => {
  const twitterShareUrl = `https://twitter.com/share?text=${data.ghostPost.title}&url=${data.ghostPost.url}`;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${data.ghostPost.url}`;

  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&amp;url=${data.ghostPost.url}/&amp;title=${data.ghostPost.title}`;

  const mailShareUrl = `mailto:?subject=${data.ghostPost.title}&amp;body=${data.ghostPost.url}`;

  

  return (
    <>
      <MetaData data={data} location={location} amp={pageContext.amp} type="article" />

      <div className={data.ghostPost.feature_image ? "cover-active" : ""}>
        {/* <Layout> */}
          <header
            className={
              "post-header " + (data.ghostPost.feature_image ? "has-cover" : "")
            }
          >
            <div className="inner">
              <span className="post-info">
                <span className="post-type">Article</span>
                {data.ghostPost.primary_tag && (
                  <span className="post-count">
                    {data.ghostPost.primary_tag.name}
                  </span>
                )}
              </span>
              <h1 className="post-title">{data.ghostPost.title}</h1>
              <div className="post-meta">
                <div className="post-meta-avatars">
                  {data.ghostPost.primary_author.profile_image && (
                    <figure className="post-meta-avatar avatar">
                      <Link
                        to={`/author/${data.ghostPost.primary_author.slug}`}
                        className="author-avatar"
                      >
                        <img
                          className="author-profile-image"
                          src={data.ghostPost.primary_author.profile_image}
                          alt={data.ghostPost.primary_author.name}
                        />
                      </Link>
                    </figure>
                  )}
                </div>
                <h4 className="post-meta-author">
                  {data.ghostPost.primary_author.name}
                </h4>
                <time dateTime="{{date format='DD-MM-YYYY'}}">
                  {data.ghostPost.updated_at}
                </time>{" "}
                &bull; {data.ghostPost.reading_time} min to read
              </div>
              {data.ghostPost.feature_image && (
                <div class="post-cover cover">
                  <img
                    srcSet={
                      data.ghostPost.localFeatureImage.childImageSharp.fluid
                        .srcSet
                    }
                    alt={data.ghostPost.title}
                    
                  />
                  <amp-img srcSet={data.ghostPost.localFeatureImage.childImageSharp.fluid
                        .srcSet} class="contain" layout="fill" alt={data.ghostPost.title} />
                  {/* <Image
                    fluid={
                      data.ghostPost.localFeatureImage.childImageSharp.fluid
                        .srcSet
                    }
                  /> */}
                </div>
              )}
            </div>
          </header>
          <main className="content" role="main">
            <article className="post tag-getting-started">
              <div className="inner">
                <section
                  className="post-content"
                  dangerouslySetInnerHTML={{ __html: data.ghostPost.html }}
                ></section>

                <section className="post-footer">
                  <div className="post-share">
                    <span className="post-info-label">Share</span>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Twitter"
                      className="twitter"
                      href={twitterShareUrl}
                    >
                      <i className="icon icon-twitter"></i>
                      <span className="hidden">Twitter</span>
                    </a>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Facebook"
                      className="facebook"
                      href={facebookShareUrl}
                    >
                      <i className="icon icon-facebook"></i>
                      <span className="hidden">Facebook</span>
                    </a>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      title="LinkedIn"
                      className="linkedin"
                      href={linkedInShareUrl}
                    >
                      <i className="icon icon-linkedin"></i>
                      <span className="hidden">LinkedIn</span>
                    </a>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Email"
                      className="email"
                      href={mailShareUrl}
                    >
                      <i className="icon icon-mail"></i>
                      <span className="hidden">Email</span>
                    </a>
                  </div>
                  {data.ghostPost.primary_tag && (
                    <aside className="post-tags">
                      <span className="post-info-label">Topic</span>
                      <a href={`/tag/${data.ghostPost.primary_tag.slug}/`}>
                        {data.ghostPost.primary_tag.name}
                      </a>
                    </aside>
                  )}
                </section>

                <aside className="post-nav">
                  {data.nextPost && (
                    <a className="post-nav-next" href={data.nextPost.slug}>
                      <section className="post-nav-teaser">
                        <i className="icon icon-arrow-left"></i>
                        <h2 className="post-nav-title">
                          {data.nextPost.title}
                        </h2>
                        <p className="post-nav-excerpt">
                          {data.nextPost.excerpt}&hellip;
                        </p>
                        <p className="post-nav-meta">
                          <time dateTime="{{date format='DD-MM-YYYY'}}">
                            {data.nextPost.updated_at}
                          </time>
                        </p>
                      </section>
                    </a>
                  )}

                  {data.prevPost && (
                    <a className="post-nav-prev" href={data.prevPost.slug}>
                      <section className="post-nav-teaser">
                        <i className="icon icon-arrow-right"></i>
                        <h2 className="post-nav-title">
                          {data.prevPost.title}
                        </h2>
                        <p className="post-nav-excerpt">
                          {data.prevPost.excerpt}&hellip;
                        </p>
                        <p className="post-nav-meta">
                          <time dateTime="{{date format='DD-MM-YYYY'}}">
                            {data.prevPost.updated_at}
                          </time>
                        </p>
                      </section>
                    </a>
                  )}

                  <div className="clear"></div>
                </aside>
              </div>
            </article>
          </main>
        {/* </Layout> */}
      </div>
    </>
  );
};

export default PostTemplate;

export const pageQuery = graphql`
  query($slug: String, $prev: String, $next: String) {
    ghostPost(slug: { eq: $slug }) {
      title
      html
      codeinjection_styles
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
      reading_time
      feature_image
      localFeatureImage {
        childImageSharp {
          fluid {
            srcSet
          }
        }
      }
      url
    }

    prevPost: ghostPost(slug: { eq: $prev }) {
      title
      excerpt
      slug
      updated_at(formatString: "MMMM DD YYYY")
    }

    nextPost: ghostPost(slug: { eq: $next }) {
      title
      excerpt
      slug
      updated_at(formatString: "MMMM DD YYYY")
    }
  }
`;
