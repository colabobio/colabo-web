import * as React from "react"
import { graphql } from "gatsby"
import { Box, Flex, Paragraph } from "@theme-ui/components"
import Lottie from "lottie-react-web"
import animation from "../components/logo/logo-animation.json"

import Layout from "../components/layout"
import Seo from "../components/seo"

const Home = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Home" />
      <Flex sx={{ flexDirection: "column" }}>
        <Flex
          sx={{
            height: ["calc(100vh - 10em)", "100vh"],
            width: "100%",
            justifyItems: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Lottie
            options={{
              loop: false,
              animationData: animation,
            }}
          />
        </Flex>
        <Box as="section" id="about" my={6}>
          <Paragraph>
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts. Separated they
            live in Bookmarksgrove right at the coast of the Semantics, a large
            language ocean. A small river named Duden flows by their place and
            supplies it with the necessary regelialia.
          </Paragraph>
          <Paragraph>
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts. Separated they
            live in Bookmarksgrove right at the coast of the Semantics, a large
            language ocean. A small river named Duden flows by their place and
            supplies it with the necessary regelialia.
          </Paragraph>
          <Paragraph>
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts. Separated they
            live in Bookmarksgrove right at the coast of the Semantics, a large
            language ocean. A small river named Duden flows by their place and
            supplies it with the necessary regelialia.
          </Paragraph>
          <Paragraph>
            Far far away, behind the word mountains, far from the countries
            Vokalia and Consonantia, there live the blind texts. Separated they
            live in Bookmarksgrove right at the coast of the Semantics, a large
            language ocean. A small river named Duden flows by their place and
            supplies it with the necessary regelialia.
          </Paragraph>
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
