import React, { useEffect, useState } from "react"
import { Link, StaticImage } from "gatsby"
import { Flex, Box, NavLink, useColorMode } from "theme-ui"

import Logo from "../images/colabo-small-logo.svg"

// const Footer = () => (
//   <footer>
//     © {new Date().getFullYear()}, Built with
//     {` `}
//     <a href="https://www.gatsbyjs.com">Gatsby</a>
//   </footer>
// )

const colors = [
  "red",
  "yellow",
  "green",
  "lightblue",
  "pink",
  "purple",
  "default",
]

const compareLocation = ({ to, loc }) =>
  loc === to ? true : to === "/" ? false : loc.includes(to) ? true : false

const NavItem = ({ to, children, location }) => {
  const active = compareLocation({ loc: location, to })
  return (
    <NavLink
      as={Link}
      to={to}
      sx={{
        display: "block",
        width: "100%",
        fontSize: 18,
        color: "initial",
        fontWeight: active ? "700" : "400",
        fontStyle: active ? "italic" : "initial",
        ":hover": {
          color: "#141414",
        },
      }}
    >
      {children}
    </NavLink>
  )
}

const NavBar = ({ location = "/" }) => (
  <Flex as="nav" sx={{ flexDirection: "column" }}>
    <Box px={4} py={2} marginTop={3}>
      <NavItem location={location} to="/">
        <img src={Logo} width={125} quality={95} alt="A colabo logo" />
      </NavItem>
    </Box>
    <Box px={4} py={2}>
      <NavItem location={location} to="/about">
        ABOUT
      </NavItem>
    </Box>
    <Box px={4} py={2}>
      <NavItem location={location} to="/team">
        TEAM
      </NavItem>
    </Box>
    <Box px={4} py={2}>
      <NavItem location={location} to="/research">
        RESEARCH
      </NavItem>
    </Box>
    <Box px={4} py={2}>
      <NavItem location={location} to="/contact">
        CONTACT
      </NavItem>
    </Box>
    <Box px={4} py={2}>
      <NavItem location={location} to="/notebook">
        NOTEBOOK
      </NavItem>
    </Box>
  </Flex>
)

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const [_colorMode, setColorMode] = useColorMode()

  useEffect(() => {
    let usedThemes = []
    let selectableThemes = colors
    const interval = setInterval(() => {
      if (selectableThemes.length === 0) {
        selectableThemes = colors
        usedThemes = []
      }
      const randomColor =
        selectableThemes[Math.floor(Math.random() * selectableThemes.length)]
      const used = [...usedThemes, randomColor]
      const selectable = selectableThemes.filter(x => used.indexOf(x) === -1)
      usedThemes = used
      selectableThemes = selectable
      setColorMode(randomColor)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Box className="global-wrapper" data-is-root-path={isRootPath}>
      <Flex>
        <Box sx={{ position: "fixed", zIndex: 100 }}>
          <NavBar location={location.pathname} />
        </Box>
        <Box
          as="main"
          sx={{
            width: "100%",
            height: "100vh",
            minWidth: 0,
            maxWidth: "768px",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          {/* <header className="global-header">{header}</header> */}
          {children}
        </Box>
      </Flex>
    </Box>
  )
}

export default Layout
