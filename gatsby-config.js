module.exports = {
  siteMetadata: {
    siteTitle: 'Ibby Dot Blog',
    siteDescription: "My little corner of the internet",
    siteImage: '/ibby-blog.png', // main image of the site for metadata
    siteUrl: 'https://ibby.blog/',
    pathPrefix: '/',
    siteLanguage: 'en',
    ogLanguage: `en_UK`,
    author: 'Ibby EL-Serafy', // for example - 'Ivan Ganev'
    authorDescription: "Hey, I'm Ibby, a human being living in Sheffield", // short text about the author
    avatar: '/avatar.jpg',
    twitterSite: '', // website account on twitter
    twitterCreator: '', // creator account on twitter
    social: [
      {
        icon: `github`,
        url: `https://github.com/parc6502`
      },
      {
        icon: `medium`,
        url: `https://medium.com/@theibbster`
      },
      {
        icon: `mastodon`,
        url: `https://mastodon.social/@theibbster`
      },
      {
        icon: `instagram`,
        url: `https://www.instagram.com/polecrobat/`
      },
    ]
  },
  plugins: [
    {
      resolve: 'gatsby-theme-chronoblog',
      options: {
        uiText: {
          // ui text fot translate
          feedShowMoreButton: 'show more',
          feedSearchPlaceholder: 'search',
          cardReadMoreButton: 'read more →',
          allTagsButton: 'all tags'
        },
        feedItems: {
          // global settings for feed items
          limit: 50,
          yearSeparator: false,
          yearSeparatorSkipFirst: true,
          contentTypes: {
            links: {
              beforeTitle: '🔗 '
            }
          }
        },
        feedSearch: {
          symbol: '🔍'
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ibby Dot Blog`,
        short_name: `ibby.blog`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#3a5f7d`,
        display: `standalone`,
        icon: `src/assets/favicon.png`
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-feed-mdx`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title: siteTitle
                description: siteDescription
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              console.log(allMdx.edges)
              return allMdx.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.frontmatter.description,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  type: edge.node.fields.type,
                  custom_elements: [{ "content:encoded": edge.node.html }]
                });
              })
              .filter(n => n.type === 'posts');
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { 
                        slug
                        type 
                      }
                      frontmatter {
                        title
                        date
                        description
                      }
                    }
                  }
                }
              }
            `,
            output: "/feed",
            title: "Ibby Dot Blog - Posts",
          }
        ]
      }
    }
  ]
};
