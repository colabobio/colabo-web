import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"

import { Box, Heading } from "@theme-ui/components"

const Research = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Research" />
      <Box mt={5}>
        <Heading>Research</Heading>
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
  }
`
