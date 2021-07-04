import * as React from "react"
import { graphql } from "gatsby"
import { Box, Heading } from "@theme-ui/components"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Contact = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Contact" />
      <Box mt={5}>
        <Heading>Contact</Heading>
      </Box>
    </Layout>
  )
}

export default Contact

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
