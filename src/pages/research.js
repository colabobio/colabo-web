import * as React from "react"
import { graphql } from "gatsby"
import { Box, Flex, Paragraph } from "@theme-ui/components"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Accordion from "../components/accordion"

const researchParser = (files = []) =>
  files.map((research, index) => {
    const title = research.frontmatter.title || research.fields.slug
    const icon = research.frontmatter.icon.childImageSharp.fluid
    const content = research.frontmatter.description
    const slug = research.fields.slug
    const itemLink = `/research${research.fields.slug}`
    return { index, title, icon, content, slug, itemLink }
  })

const Research = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const allResearchFiles = data.allFile.nodes.map(
    post => post.childMarkdownRemark
  )
  if (allResearchFiles.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="Research" />
        <p>No blog posts found. Add markdown posts to "content/research".</p>
      </Layout>
    )
  }

  const researchs = researchParser(allResearchFiles)

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
          <Paragraph>
          Our research integrates data visualization, machine learning, and digital technologies to create 
          new methods and tools to study infectios diseases, visualize complex datasets, and help with STEM 
          education. Explore the virtual space below to learn more about the projects in the lab.

          <iframe src="https://hubs.mozilla.com/FBhqaQK/colabo-outdoors-meeting-space/" width="100%" height="600" frameborder="0" scrolling="yes"></iframe>

          </Paragraph>          
          <Accordion defaultIndex="1" data={researchs} />
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
      sort: { fields: childrenMarkdownRemark___frontmatter___order, order: ASC }
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
