import React, { useState } from "react"
import { Link } from "gatsby"
import { Flex, Box, MenuButton } from "theme-ui"
import Logo from "../images/colabo-small-logo.svg"

const navItemActiveStyle = {
  fontWeight: "700",
  fontStyle: "italic",
}

const navItemStyle = {
  display: "block",
  width: "100%",
  fontSize: 18,
  color: "initial",
  fontWeight: "400",
  fontStyle: "initial",
  textDecoration: "none",
  ":hover": {
    color: "red",
  },
  ":focus": {
    color: "#141414",
  },
}

const colors = [
  "default",
  "red",
  "yellow",
  "green",
  "lightblue",
  "pink",
  "purple",
]

const NavBar = () => {
  const [navOpen, setNavOpen] = useState(false)
  return (
    <>
      <Box mt={4} ml={4} sx={{ display: ["block", "none"], zIndex: 10 }}>
        <MenuButton aria-label="Toggle Menu" onClick={() => setNavOpen(true)} />
      </Box>
      <Box
        sx={theme => ({
          zIndex: 10,
          maxHeight: ["none", "calc(100vh - 64px)"],
          minHeight: ["100vh", "none"],
          position: ["absolute", "sticky"],
          background: [theme.rawColors.background, "transparent"],
          top: 0,
          height: ["100%", "auto"],
          width: ["100%", "auto"],
          bottom: "auto",
          overflowX: ["hidden", "visible"],
          overflowY: ["hidden", "visible"],
          flex: "none",
          display: [navOpen ? "flex" : "none", "flex"],
          transition: "background 500ms ease",
        })}
      >
        <Box
          as="nav"
          sx={{
            flexDirection: "column",
            width: ["100%", "auto"],
            textAlign: ["center", "left"],
          }}
        >
          <Box px={4} pt={2} sx={{ marginBottom: [4, 0], marginTop: [5, 3] }}>
            <Link to="/" style={navItemStyle}>
              <img src={Logo} width={125} quality={95} alt="A colabo logo" />
            </Link>
          </Box>
          <Box px={4} pt={2} sx={{ marginBottom: [4, 0] }}>
            <Link to="/" activeStyle={navItemActiveStyle} style={navItemStyle}>
              ABOUT
            </Link>
          </Box>
          <Box px={4} pt={2} sx={{ marginBottom: [4, 0] }}>
            <Link
              activeStyle={navItemActiveStyle}
              style={navItemStyle}
              to="/team"
              partiallyActive={true}
            >
              TEAM
            </Link>
          </Box>
          <Box px={4} pt={2} sx={{ marginBottom: [4, 0] }}>
            <Link
              activeStyle={navItemActiveStyle}
              style={navItemStyle}
              to="/research"
              partiallyActive={true}
            >
              RESEARCH
            </Link>
          </Box>
          <Box px={4} pt={2} sx={{ marginBottom: [4, 0] }}>
            <Link
              activeStyle={navItemActiveStyle}
              style={navItemStyle}
              to="/contact"
              partiallyActive={true}
            >
              CONTACT
            </Link>
          </Box>
          <Box px={4} pt={2} sx={{ marginBottom: [4, 0] }}>
            <Link
              activeStyle={navItemActiveStyle}
              style={navItemStyle}
              to="/notebook"
              partiallyActive={true}
            >
              NOTEBOOK
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  )
}

const Layout = ({ location, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <Box className="global-wrapper" data-is-root-path={isRootPath}>
      <Flex sx={{ flexDirection: ["column", "row"], position: "relative" }}>
        <NavBar location={location.pathname} />
        <Box
          as="main"
          sx={{
            width: "100%",
            minWidth: 0,
            maxWidth: "1024px",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
        >
          {children}
        </Box>
      </Flex>
    </Box>
  )
}

export default Layout
