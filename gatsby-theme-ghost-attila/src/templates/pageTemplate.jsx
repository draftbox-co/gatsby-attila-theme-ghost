import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Helmet from "react-helmet";
import { MetaData } from "../components/meta";

const PageTemplate = ({ data, location }) => {
  const twitterShareUrl = `https://twitter.com/share?text=${data.ghostPage.title}&url=${data.ghostPage.url}`;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${data.ghostPage.url}`;

  const linkedInShareUrl = `https://www.linkedin.com/shareArticle?mini=true&amp;url=${data.ghostPage.url}/&amp;title=${data.ghostPage.title}`;

  const mailShareUrl = `mailto:?subject=${data.ghostPage.title}&amp;body=${data.ghostPage.url}`;

  return (
    <>
      <MetaData data={data} location={location} type="article" />
      <Helmet htmlAttributes={{"lang": "en"}}>
        <style type="text/css">{`${data.ghostPage.codeinjection_styles}`}</style>
      </Helmet>
      <div className={data.ghostPage.feature_image ? "cover-active" : ""}>
        <Layout>
          <header
            className={
              "post-header " + (data.ghostPage.feature_image ? "has-cover" : "")
            }
          >
            <div className="inner">
              <span className="post-info">
                <span className="post-type">Article</span>
                {data.ghostPage.primary_tag && (
                  <span className="post-count">
                    {data.ghostPage.primary_tag.name}
                  </span>
                )}
              </span>
              <h1 className="post-title">{data.ghostPage.title}</h1>
              <div className="post-meta">
                <div className="post-meta-avatars">
                  {data.ghostPage.primary_author.profile_image && (
                    <figure className="post-meta-avatar avatar">
                      <Link
                        to={`/author/${data.ghostPage.primary_author.slug}`}
                        className="author-avatar"
                      >
                        <img
                          className="author-profile-image"
                          src={data.ghostPage.primary_author.profile_image}
                          alt={data.ghostPage.primary_author.name}
                        />
                      </Link>
                    </figure>
                  )}
                </div>
                <h4 className="post-meta-author">
                  {data.ghostPage.primary_author.name}
                </h4>
                <time dateTime="{{date format='DD-MM-YYYY'}}">
                  {data.ghostPage.updated_at}
                </time>{" "}
                &bull; {data.ghostPage.readingTime}
              </div>
              {data.ghostPage.localFeatureImage && data.ghostPage.localFeatureImage.childImageSharp && (
                <div class="post-cover cover">
                  <img
                    srcSet={
                      data.ghostPage.localFeatureImage.childImageSharp.fluid
                        .srcSet
                    }
                    alt={data.ghostPage.title}
                  />
                </div>
              )}
              {data.ghostPage.localFeatureImage && data.ghostPage.localFeatureImage.extension === "svg" && (
                <div class="post-cover cover">
                  <img
                    src={
                      data.ghostPage.localFeatureImage.publicURL
                    }
                    alt={data.ghostPage.title}
                  />
                </div>
              )}
            </div>
          </header>
          <main className="content" role="main">
            <article className="post tag-getting-started">
              <div className="inner">
                <section
                  className="post-full-content"
                  
                >
                  <div className="post-content" dangerouslySetInnerHTML={{ __html: data.ghostPage.rehypedHTML[0].html }}></div>
                </section>

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
                  {data.ghostPage.primary_tag && (
                    <aside className="post-tags">
                      <span className="post-info-label">Topic</span>
                      <a href={`/tag/${data.ghostPage.primary_tag.slug}/`}>
                        {data.ghostPage.primary_tag.name}
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
        </Layout>
      </div>
    </>
  );
};

export default PageTemplate

export const pageQuery = graphql`
  query($slug: String) {
    ghostPage(slug: { eq: $slug }) {
      title
      slug
      featured
      feature_image
      excerpt
      custom_excerpt
      visibility
      # Dates formatted
      created_at_pretty: created_at(formatString: "DD MMMM, YYYY")
      published_at_pretty: published_at(formatString: "DD MMMM, YYYY")
      updated_at_pretty: updated_at(formatString: "DD MMMM, YYYY")
      # Dates unformatted
      created_at(formatString: "DD MMMM, YYYY")
      published_at
      updated_at(formatString: "MMMM DD YYYY")
      # SEO
      meta_title
      meta_description
      og_description
      og_image
      og_title
      twitter_description
      twitter_image
      twitter_title
      # Authors
      authors {
        name
        slug
        bio
        # email
        profile_image
        twitter
        facebook
        website
      }
      primary_author {
        name
        slug
        bio
        # email
        profile_image
        twitter
        facebook
        website
      }
      # Tags
      primary_tag {
        name
        slug
        description
        feature_image
        meta_description
        meta_title
        visibility
      }
      tags {
        name
        slug
        description
        feature_image
        meta_description
        meta_title
        visibility
      }
      # Content
      plaintext
      html
      rehypedHTML: children {
        ... on HtmlRehype {
          html
        }
      }
      # Additional fields
      url
      canonical_url
      uuid
      page
      codeinjection_foot
      codeinjection_head
      codeinjection_styles
      comment_id
      readingTime
      # ImgSharp
      localFeatureImage {
        childImageSharp {
          fluid {
            srcSet
          }
        }
        publicURL
        extension
      }
    }
  }
`;
