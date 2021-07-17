import React, { useEffect } from "react"
import { useColorMode, ThemeProvider } from "theme-ui"

// custom typefaces
import "typeface-inter"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/style.css"

import theme from "./src/gatsby-plugin-theme-ui/index"
// Highlighting for code blocks
import "prismjs/themes/prism.css"

const limit = { min: 240000, max: 360000 }
const colors = [
  "default",
  "red",
  "yellow",
  "green",
  "lightblue",
  "pink",
  "purple",
]

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>{element}</Wrapper>
    </ThemeProvider>
  )
}

const Wrapper = ({ children }) => {
  const setColorMode = useColorMode()[1]
  const randomTimer = () =>
    Math.floor(Math.random() * (limit.max - limit.min + 1) + limit.min)

  useEffect(() => {
    let usedThemes = []
    let selectableThemes = colors
    const interval = setInterval(() => {
      if (selectableThemes.length === 0) {
        selectableThemes = colors
        usedThemes = []
      }
      const selectable = selectableThemes.filter(x => used.indexOf(x) === -1)
      selectableThemes = selectable
      const randomColor =
        selectableThemes[Math.floor(Math.random() * colors.length)]
      const used = [...usedThemes, randomColor]
      usedThemes = used
      setColorMode(randomColor)
    }, randomTimer())
    return () => clearInterval(interval)
    /* eslint-disable  react-hooks/exhaustive-deps */
  }, [])

  return <div>{children}</div>
}
