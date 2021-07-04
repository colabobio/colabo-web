import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { Box, Heading } from "@theme-ui/components"

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="About" />
      <Box mt={5}>
        <Heading>
          Lab Members & <br /> Collaborators
        </Heading>
        <Box as="section" my={5}>
          <Heading>Faculty</Heading>
        </Box>

        <Box as="section" my={5}>
          <Heading>Rotation Students</Heading>
        </Box>

        <Box as="section" my={5}>
          <Heading>Collaborators</Heading>
        </Box>
      </Box>
    </Layout>
  )
}

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
