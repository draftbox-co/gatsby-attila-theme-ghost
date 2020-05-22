import React from "react";
import { Link } from "gatsby";

const PostCard = ({ post }) => {
  let excerpt = "";

  if (post.excerpt) {
    excerpt = post.excerpt + "...";
  }

  return (
    <div id={post.uuid} className="container">
      <main className="content" role="main">
        <div>
          <article className="post tag-getting-started">
            <div className="inner">
              <div className="box post-box">
                <h2 className="post-title">
                  <Link
                    className="break-words"
                    to={`/${post.slug}`}
                    dangerouslySetInnerHTML={{ __html: post.title }}
                  ></Link>
                </h2>

                <span className="post-meta">
                  By{" "}
                  {post.authors.map((author, index) => (
                    <Link
                      key={index}
                      className="post-meta-tag"
                      to={`/author/${author.slug}`}
                    >
                      {author.name}
                    </Link>
                  ))}
                  {post.tags.length > 0 && " in "}
                  {post.tags.map((tag, index) => (
                    <>
                      <Link
                        key={index}
                        className="post-meta-tag"
                        to={`/tag/${tag.slug}`}
                      >
                        {" "}
                        {tag.name}
                      </Link>
                      {index !== post.tags.length - 1 ? ", " : ""}
                    </>
                  ))}
                  {"  "}
                  on{" "}
                  <time dateTime="{{date format='DD-MM-YYYY'}}">
                    {post.updated_at}
                  </time>{" "}
                  &bull; {post.readingTime}
                </span>
                <p
                  className="post-excerpt break-words"
                  dangerouslySetInnerHTML={{ __html: excerpt }}
                ></p>
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
};

export default PostCard;
