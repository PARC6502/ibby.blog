import React from 'react';
import { Container } from '@theme-ui/components'
// import Container from 'gatsby-theme-chronoblog/src/components/container';
import Footer from 'gatsby-theme-chronoblog/src/components/footer';
import Header from 'gatsby-theme-chronoblog/src/components/header';
import Root from 'gatsby-theme-chronoblog/src/components/root';

export default ({ children }) => {
  // const topSection = React.Children.map(children, child => {
  //   if (child.props.mdxType != "FeedItems") return child;
  //   return null;
  // });
  const formattedChildren = React.Children.map(children, child => {
    if (child.type === "main") return (<Container variant='mainContainer'>{child}</Container>);
    return child;
  });
  // console.log(feedItems);
  React.Children.forEach(children, child => {
    console.log(child);
  })
  return (
    <Root>
      <Header />
      <Container p={[2,3,4]}>{formattedChildren}</Container>
      {/* <Container>{topSection}</Container> */}
      {/* {feedItems} */}
      <Footer />
    </Root>
  );
};