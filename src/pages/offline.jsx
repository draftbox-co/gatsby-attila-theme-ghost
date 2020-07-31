import React from "react";
import { Link } from "gatsby";
import "../styles/sass/style.scss";

const OfflinePage = () => {
  return (
    <section class="error-message-container">
      <div className="error-message">
        <h1 class="error-code">Offline :(</h1>
        <p class="error-description">
          Looks like you lost your connection. Please check it and try again.
        </p>
        <Link class="error-link" to="/">
          Try again →
        </Link>
      </div>
    </section>
  );
};

export default OfflinePage;
