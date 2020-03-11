import React from "react";
import { Link } from "gatsby";

const PostCard = ({ post }) => {
  return (
    <div id="index" className="container">
      <main className="content" role="main">
        <div>
          <article className="post tag-getting-started">
            <div className="inner">
              <div className="box post-box">
                <h2 className="post-title">
                  <Link to={`/${post.slug}`}>{post.title}</Link>
                </h2>

                <span className="post-meta">
                  By {post.authors.map(author => author.name)} in{" "}
                  {post.tags.map((tag, index) => (
                    <Link
                      key={index}
                      className="post-meta-tag"
                      to={`/tag/${tag.slug}`}
                    >
                      {tag.name}
                    </Link>
                  ))}{" "}
                  on{" "}
                  <time dateTime="{{date format='DD-MM-YYYY'}}">
                    {post.updated_at}
                  </time>
                </span>
                <p className="post-excerpt">{post.excerpt}&hellip;</p>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
};

export default PostCard;
