import * as React from "react"
import { graphql } from "gatsby"
import { Flex, Box, Heading } from "@theme-ui/components"

import Link from "../components/link"
import Layout from "../components/layout"
import Seo from "../components/seo"

// HELPERS
const mediumBaseURL = "https://colabobio.medium.com/"
const linkStyle = { textDecoration: "none", color: "inherit" }

const Notebook = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allFile.nodes.map(post => post.childMarkdownRemark)
  const mediumPosts = data.allMediumPost.nodes

  if (posts.length === 0 && mediumPosts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="Notebook" />
        <p>
          No blog posts found. Add markdown posts to "content/notebook".
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Notebook" />

      <Flex sx={{ flexDirection: "column" }} mt={5}>
        {/* <Heading mb={5}>Medium notes</Heading> */}
        {mediumPosts.map(post => {
          const title = post.title
          const uniqueRef = post.uniqueSlug
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
                  href={mediumBaseURL + uniqueRef}
                >
                  <Heading>{title}</Heading>
                </a>
              </article>
            </Box>
          )
        })}
      </Flex>

      {/* <Flex sx={{ flexDirection: "column" }} mt={5}>
        <Heading mb={5}>Colabo notes</Heading>
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
      </Flex> */}

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
    allMediumPost {
      nodes {
        author {
          name
        }
        content {
          subtitle
        }
        createdAt
        title
        uniqueSlug
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
