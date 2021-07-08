import * as React from "react"
import { graphql } from "gatsby"

import Link from "../components/link"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

import { Flex, Box, Heading } from "@theme-ui/components"

const Notebook = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allFile.nodes.map(post => post.childMarkdownRemark)

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Notebook" />
      <Flex sx={{ flexDirection: "column" }} mt={5}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <Box key={post.fields.slug} mb={6}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <Link to={"/notebook" + post.fields.slug}>
                  <Heading>{title}</Heading>
                </Link>
              </article>
            </Box>
          )
        })}
      </Flex>
    </Layout>
  )
}

export default Notebook

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }

    allFile(
      filter: { sourceInstanceName: { eq: "notebook" }, ext: { eq: ".md" } }
      sort: { fields: childMarkdownRemark___frontmatter___date, order: DESC }
    ) {
      nodes {
        childMarkdownRemark {
          id
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
