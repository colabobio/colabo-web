import * as React from "react"
import { graphql } from "gatsby"
import { Box, Flex } from "@theme-ui/components"

import Layout from "../components/layout"
import Seo from "../components/seo"

import FullLogo from "../images/colabo-full-logo.svg"
import Logo from "../components/logo"

const Home = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Home" />
      <Box
        // mt={5}
        sx={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          left: 0,
          top: 0,
        }}
      >
        <Flex
          sx={{
            width: "100%",
            height: "100%",
            justifyItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <img src={FullLogo} width={900} /> */}
          <Logo />
        </Flex>
      </Box>
    </Layout>
  )
}

export default Home

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
