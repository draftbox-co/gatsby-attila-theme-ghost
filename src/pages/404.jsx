import React from "react";
import { Link } from "gatsby";
import "../styles/sass/style.scss";

const ErrorPage = () => {
  return (
    <section class="error-message-container">
      <div className="error-message">
        <h1 class="error-code">Page Not Found</h1>
        <p class="error-description">
          Looks like you've followed a broken link or entered a URL that doesn't
          exist on this site.
        </p>
        <Link class="error-link" to="/">
          Back to our site →
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage;
