import React from 'react';

import FeedItems from 'gatsby-theme-chronoblog/src/components/feed-items';
import FeedSearch from 'gatsby-theme-chronoblog/src/components/feed-search';
import Layout from 'gatsby-theme-chronoblog/src/components/layout';
import Tags from 'gatsby-theme-chronoblog/src/components/tags';

export default () => {
  return (
    <Layout>
      <h1>It seems you've gotten turned around....</h1>
      <p>&nbsp;</p>
      <FeedSearch />
      <Tags />
      <FeedItems />
    </Layout>
  );
};