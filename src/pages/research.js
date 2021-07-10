import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Accordion from "../components/accordion"

import { Box, Flex } from "@theme-ui/components"

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

  const parsedResearch = allResearch.map((research, index) => {
    const title = research.frontmatter.title || research.fields.slug
    const icon = research.frontmatter.icon.childImageSharp.fluid
    const content = research.frontmatter.description
    const slug = research.fields.slug
    const itemLink = `/research${research.fields.slug}`
    return { index, title, icon, content, slug, itemLink }
  })

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Research" />
      <Box mt={5}>
        <Flex
          sx={{
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
          mt={5}
        >
          <Accordion defaultIndex="1" data={parsedResearch} />
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
            icon {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
