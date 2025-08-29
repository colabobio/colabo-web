const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions, reporter }) => {
	const { createPage, createRedirect } = actions;

	createRedirect({
		fromPath: `/team`,
		toPath: `/about`,
	});
	createRedirect({
		fromPath: `/research/dig-epic`,
		toPath: `/research/digital-epidemiology`,
	});
	createRedirect({
		fromPath: `/research/clinical-ml`,
		toPath: `/research/machine-learning`,
	});
	createRedirect({
		fromPath: `/research/gen-viz`,
		toPath: `/projects`,
	});
	createRedirect({
		fromPath: `/research/art-sci`,
		toPath: `/projects`,
	});

	createRedirect({
		fromPath: `/team/`,
		toPath: `/about/`,
	});
	createRedirect({
		fromPath: `/research/dig-epic/`,
		toPath: `/research/digital-epidemiology/`,
	});
	createRedirect({
		fromPath: `/research/clinical-ml/`,
		toPath: `/research/machine-learning/`,
	});
	createRedirect({
		fromPath: `/research/gen-viz/`,
		toPath: `/projects/`,
	});
	createRedirect({
		fromPath: `/research/art-sci/`,
		toPath: `/projects/`,
	});

	// Define a template for blog post
	const templatePage = path.resolve(`./src/templates/template.js`);

	const generatePages = ({ pages, template }) => {
		pages.forEach((page, index) => {
			const previousPostId = index === 0 ? null : pages[index - 1].id;
			const nextPostId =
				index === pages.length - 1 ? null : pages[index + 1].id;
			createPage({
				path: page.fields.slug,
				component: template,
				context: {
					id: page.id,
					previousPostId,
					nextPostId,
				},
			});
		});
	};

	// Get all markdown blog posts sorted by date
	const result = await graphql(`
		{
			allFile(
				filter: {
					ext: { eq: ".md" }
					sourceInstanceName: { in: ["research", "notebook"] }
				}
				sort: { fields: childMarkdownRemark___frontmatter___date, order: ASC }
				limit: 1000
			) {
				nodes {
					sourceInstanceName
					childMarkdownRemark {
						id
						fields {
							slug
						}
					}
				}
			}
		}
	`);

	if (result.errors) {
		reporter.panicOnBuild(
			`There was an error loading your blog posts`,
			result.errors,
		);
		return;
	}

	const nodes = [...result.data.allFile.nodes];

	const mdPages = nodes.map((page) => {
		const instance = page.sourceInstanceName;
		const pageSlug = page.childMarkdownRemark.fields.slug;
		const path = `/${instance}${pageSlug}`;
		return {
			id: page.childMarkdownRemark.id,
			instance,
			path,
			fields: {
				slug: path,
			},
		};
	});

	// Create pages
	if (mdPages.length > 0) {
		generatePages({ pages: mdPages, template: templatePage });
	}
};

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField } = actions;

	if (node.internal.type === `MarkdownRemark`) {
		const value = createFilePath({ node, getNode });

		createNodeField({
			name: `slug`,
			node,
			value,
		});
	}
};

exports.createSchemaCustomization = ({ actions }) => {
	const { createTypes } = actions;

	// Explicitly define the siteMetadata {} object
	// This way those will always be defined even if removed from gatsby-config.js

	// Also explicitly define the Markdown frontmatter
	// This way the "MarkdownRemark" queries will return `null` even when no
	// blog posts are stored inside "content/blog" instead of returning an error
	createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `);
};

// Handle deprecated punycode module
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        punycode: false
      },
    },
  });
};
