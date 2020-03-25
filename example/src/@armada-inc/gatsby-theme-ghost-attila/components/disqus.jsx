import React from "react";
import { DiscussionEmbed } from "disqus-react";

const Disqus = props => {
  const disqusConfig = {
    shortname: process.env.DISQUS_SHORTNAME,
    identifier: props.slug,
    title: props.slug
  };

  return (
    <div>
      <DiscussionEmbed {...disqusConfig} />
    </div>
  );
};

export default Disqus;
