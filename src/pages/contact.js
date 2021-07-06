import * as React from "react"
import { graphql } from "gatsby"
import { Box, Heading, Text } from "@theme-ui/components"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Contact = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Contact" />
      <Box mt={5}>
        <Heading mb={5}>Contact</Heading>
        <Text>
          Feel free to reach out if you are interested in joining the lab,
          collaborating, or simply have questions about our research.
        </Text>
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
