import * as React from "react"
import { graphql } from "gatsby"
import { Box, Heading, Text, Flex, Link } from "@theme-ui/components"

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
        <Flex mt={4} sx={{ flexDirection: "column" }}>
          <Box my={2}>
            <Link
              href="mailto:labo@co-labo.org"
              sx={{ textDecoration: "none", color: "inherit", fontSize: 3 }}
            >
              Email
            </Link>
          </Box>
          <Box my={2}>
            <Link
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: "none", color: "inherit", fontSize: 3 }}
              href="https://twitter.com/colabobio"
            >
              Twitter
            </Link>
          </Box>
        </Flex>
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
