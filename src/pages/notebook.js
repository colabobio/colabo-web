import * as React from "react"
import { graphql } from "gatsby"
import { Flex, Box, Heading } from "@theme-ui/components"

import Layout from "../components/layout"
import Seo from "../components/seo"

// HELPERS
const linkStyle = { textDecoration: "none", color: "inherit" }

const Notebook = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allFile.nodes.map(post => post.childMarkdownRemark)
  const mediumPosts = data.allFeedColabobioBlog.nodes

  if (posts.length === 0 && mediumPosts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="Notebook" />
        <p>No blog posts found. Add markdown posts to "content/notebook".</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Notebook" />

      <Flex sx={{ flexDirection: "column" }} mt={5}>
        {mediumPosts.map(post => {
          const title = post.title
          const uniqueRef = post.link
          return (
            <Box key={uniqueRef} mb={6}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <a
                  style={linkStyle}
                  target="_blank"
                  rel="noreferrer"
                  href={uniqueRef}
                >
                  <Heading as="h6">{title}</Heading>
                </a>
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
    allFeedColabobioBlog {
      nodes {
        link
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
