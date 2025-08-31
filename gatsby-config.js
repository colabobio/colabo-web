/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
	siteMetadata: {
		title: 'Colubri Laboratory',
		siteUrl: 'https://co-labo.org/',
	},
	plugins: [
		{
			resolve: 'gatsby-plugin-sass',
			options: {
				sassOptions: {
					api: 'modern-compiler',
				},
			},
		},
		'gatsby-plugin-image',
		'gatsby-plugin-sitemap',
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		'gatsby-plugin-react-helmet-async',
		{
			resolve: `gatsby-plugin-nprogress`,
			options: {
				showSpinner: false,
				template: `<div class="bar">Loading…</div>`,
			},
		},
		{
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a name is required for each tracking id
        trackingIds: [
          "G-NYCDR19479", // Google Analytics / GA
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: false,
          // Setting this parameter is also optional
          respectDNT: true,
          // Avoids sending pageview hits from custom paths
          exclude: ["/preview/**", "/do-not-track/me/too/"],
        },
      },
    },
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: './src/images/',
			},
			__key: 'images',
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/notebook`,
				name: `notebook`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/research`,
				name: `research`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/team`,
				name: `team`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/heros`,
				name: `heros`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/grants`,
				name: `grants`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/publications`,
				name: `publications`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/news`,
				name: `news`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/header`,
				name: `header`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/footer`,
				name: `footer`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/privacy`,
				name: `privacy`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/terms`,
				name: `terms`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/projects`,
				name: `projects`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				path: `${__dirname}/content/basic`,
				name: `basic`,
			},
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`,
			},
		},
		{
			resolve: `gatsby-transformer-remark`,
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-embed-video',
						options: {
							width: 800,
							ratio: 1.77,
							height: 400,
							related: false,
							noIframeBorder: true,
						},
					},
					{
						resolve: `gatsby-remark-responsive-iframe`,
						options: {
							wrapperStyle: `margin-bottom: 1.0725rem`,
						},
					},
					`gatsby-remark-prismjs`,
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 630,
						},
					},
					`gatsby-remark-copy-linked-files`,
					`gatsby-remark-smartypants`,
				],
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,

		{
			resolve: `gatsby-plugin-feed`,
			options: {
				query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
				feeds: [
					{
						title: "Colubri Laboratory RSS Feed",
						description: "RSS Feed for Colubri Laboratory",
						serialize: ({ query: { site, allMarkdownRemark } }) =>
							allMarkdownRemark.nodes.map((node) => ({
								...node.frontmatter,
								description: node.excerpt,
								date: node.frontmatter.date,
								url: site.siteMetadata.siteUrl + node.fields.slug,
								guid: site.siteMetadata.siteUrl + node.fields.slug,
								custom_elements: [{ 'content:encoded': node.html }],
							})),
						query: `
              {
                allMarkdownRemark(
                  sort: { frontmatter: { date: DESC } },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
						output: '/rss.xml',
					},
				],
			},
		},
		{
			resolve: 'gatsby-plugin-alias-imports',
			options: {
				alias: {
					'@sections': 'src/components/sections',
					'@components': 'src/components',
					'@ui': 'src/components/ui',
					'@layout': 'src/components/layout',
					'@pages': 'src/pages',
					'@styles': 'src/styles',
					'@utils': 'src/utils',
					'@hooks': 'src/hooks',
					'@icons': 'src/components/ui/icons',
					'@posts': 'content/posts',
					'@api': 'src/api',
				},
				extensions: ['js', 'jsx'],
			},
		},
	],
};
