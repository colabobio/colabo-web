import React, { useEffect } from "react"
import { useColorMode, ThemeProvider } from "theme-ui"
import { getRandomTimer, getRandomFromArray } from "./src/utils"

// custom typefaces
import "typeface-inter"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/style.css"

import theme from "./src/gatsby-plugin-theme-ui/index"
// Highlighting for code blocks
import "prismjs/themes/prism.css"

// Theme timer limits in minutes
const limit = { min: 5, max: 10 }
const randomTimer = () => getRandomTimer(limit.min, limit.max)
const colors = [
  "default",
  "red",
  "yellow",
  "green",
  "lightblue",
  "pink",
  "purple",
]

const Wrapper = ({ children }) => {
  const [colorMode, setColorMode] = useColorMode()

  useEffect(() => {
    let usedThemes = [colorMode]
    const interval = setInterval(() => {
      if (usedThemes.length === colors.length) {
        usedThemes = []
      }
      const selectable = colors.filter(x => usedThemes.indexOf(x) === -1)
      const randomColor = getRandomFromArray(selectable)
      usedThemes = [...usedThemes, randomColor]
      setColorMode(randomColor)
    }, randomTimer())
    return () => clearInterval(interval)
    /* eslint-disable  react-hooks/exhaustive-deps */
  }, [])

  return <div>{children}</div>
}

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>{element}</Wrapper>
    </ThemeProvider>
  )
}
