import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Link from "../components/link"

import { Box, Heading, Flex } from "@theme-ui/components"


const Research = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const allResearch = data.allFile.nodes.map(post => post.childMarkdownRemark)

  if (allResearch.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
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
      <Seo title="Research" />
      <Box mt={5}>
        <Heading>Research</Heading>
        <Flex sx={{ flexDirection: "column" }} mt={5}>
          {allResearch.map(research => {
            const title = research.frontmatter.title || research.fields.slug

            return (
              <Box key={research.fields.slug} mb={6}>
                <article
                  className="post-list-item"
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <Link to={"/research" + research.fields.slug}>
                    <Heading>{title}</Heading>
                  </Link>
                </article>
              </Box>
            )
          })}
        </Flex>
      </Box>
    </Layout>
  )
}

export default Research

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }

    allFile(
      filter: { sourceInstanceName: { eq: "research" }, ext: { eq: ".md" } }
    ) {
      nodes {
        childMarkdownRemark {
          id
          fields {
            slug
          }
          frontmatter {
            title
            description
          }
        }
      }
    }
  }
`
