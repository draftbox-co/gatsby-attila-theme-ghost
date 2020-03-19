import React from "react";
import { Link } from "gatsby";

const ErrorPage = () => {
  return (
    <section class="error-message">
      <h1 class="error-code">404</h1>
      <p class="error-description">Page not found</p>
      <Link class="error-link" to="/">
        Go to the front page →
      </Link>
    </section>
  );
};

export default ErrorPage;
