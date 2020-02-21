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
              const { siteUrl } = site.siteMetadata
              
              return allMdx.edges.map(edge => {
                const { description, date, cover } = edge.node.frontmatter
                const { slug } = edge.node.fields

                return Object.assign({}, edge.node.frontmatter, {
                  description,
                  date,
                  url: siteUrl + slug,
                  guid: siteUrl + slug,
                  enclosure: cover && {
                    url: siteUrl + cover.publicURL
                  },
                  custom_elements: [{ "content:encoded": edge.node.html }]
                });
              })
              
            },
            query: `
              {
                allMdx(
                  filter: {
                    fields: {type: {eq: "posts"}}, 
                    frontmatter: {draft: {ne: true}}
                  },
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { 
                        slug 
                      }
                      frontmatter {
                        title
                        date
                        description
                        cover {
                          publicURL
                        }
                      }
                    }
                  }
                }
              }
            `,
            output: "/feed",
            title: "Ibby Dot Blog - Posts",
            image_url: "https://ibby.blog/avatar.jpg"
          }
        ]
      }
    }
  ]
};
