import * as React from "react"
import { graphql } from "gatsby"
import { Box, Flex, Heading, Text } from "@theme-ui/components"

import Layout from "../components/layout"
import Seo from "../components/seo"

import FullLogo from "../images/colabo-full-logo.svg"
import Logo from "../components/logo"

const Home = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Home" />
      <Flex sx={{ flexDirection: "column" }}>
        <Box
          sx={{
            width: "50vw",
            height: "100vh",
          }}
        >
          <Flex
            sx={{
              left: 0,
              top: 0,
              position: "absolute",
              width: "100%",
              height: "100%",
              justifyItems: "center",
              justifyContent: "center",
            }}
          >
            <img src={FullLogo} width={900} />
            {/* <Logo /> */}
          </Flex>
        </Box>
        <Box as="section" id="about" my={6}>
          <Box>
            <Text>
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove right at the coast of the Semantics, a
              large language ocean. A small river named Duden flows by their
              place and supplies it with the necessary regelialia.
            </Text>
          </Box>
          <Box>
            <Text>
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove right at the coast of the Semantics, a
              large language ocean. A small river named Duden flows by their
              place and supplies it with the necessary regelialia.
            </Text>
          </Box>
          <Box>
            <Text>
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove right at the coast of the Semantics, a
              large language ocean. A small river named Duden flows by their
              place and supplies it with the necessary regelialia.
            </Text>
          </Box>
          <Box>
            <Text>
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove right at the coast of the Semantics, a
              large language ocean. A small river named Duden flows by their
              place and supplies it with the necessary regelialia.
            </Text>
          </Box>
          
        </Box>
      </Flex>
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
