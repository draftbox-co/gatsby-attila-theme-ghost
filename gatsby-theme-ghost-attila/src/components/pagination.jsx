import React from "react";
import { Link } from "gatsby";

const Pagination = ({ pageContext }) => {
  const {
    previousPagePath,
    nextPagePath,
    humanPageNumber,
    numberOfPages
  } = pageContext;
  return (
    <nav className="pagination">
      <div className="inner">
        <div
          className="box pagination-box"
          role="navigation"
          aria-label="Pagination Navigation"
        >
          {previousPagePath && (
            <Link
              to={previousPagePath}
              title="Newer Posts"
              className="pagination-next"
            >
              <i className="icon icon-arrow-left"></i>{" "}
              <span className="pagination-label">Newer Posts</span>
            </Link>
          )}

          <span className="pagination-info">{`Page ${humanPageNumber} of ${numberOfPages}`}</span>
          {numberOfPages > 1 && (
            <Link
              title="Older Posts"
              className="pagination-prev"
              to={nextPagePath}
            >
              <span className="pagination-label">Older Posts</span>{" "}
              <i className="icon icon-arrow-right"></i>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Pagination;
