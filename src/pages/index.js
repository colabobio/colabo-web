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
          Welcome to the Colubri Laboratory (CoLabo) at the <a href="https://www.umassmed.edu/bioinformatics/bib-news/welcome-to-bib/">Bioinformatics and Integrative Biology program</a> at the University of Massachusetts. Our research integrates data visualization, machine learning, and mobile technologies to create new methods and tools for biomedical research, education, and outreach.
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
