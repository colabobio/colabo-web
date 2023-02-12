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
          Welcome to the Colubri Laboratory (CoLabo) in the <a href="https://www.umassmed.edu/bioinformatics/bib-news/welcome-to-bib/">Bioinformatics and Integrative Biology program</a> at the University of Massachusetts Chan Medical School. Our team brings together computational scientists, software engineers, and visual designers to develop new methods and tools for infectious disease research. With our partners at the <a href="https://www.sabetilab.org/">Broad Institute of MIT and Harvard</a> and <a href="https://theinspireproject.us/">The Inspire Project</a>, we have created <a href="https://operationoutbreak.org/">Operation Outbreak</a>, the world's first live, app-based outbreak simulator to generate ground-truth datasets, validate predictive models, and improve the response to future pandemics. We seek collaborations at the intersection of epidemiology, genomics, machine learning, data visualization, and mobile technologies with the goal of advancing an interdisciplinary vision of outbreak science.
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
