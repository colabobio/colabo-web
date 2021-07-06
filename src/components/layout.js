import React, { useEffect } from "react"
import { Link } from "gatsby"
import { Flex, Box, useColorMode } from "theme-ui"

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

const NavBar = () => (
  <Flex as="nav" sx={{ flexDirection: "column" }}>
    <Box px={4} py={2} marginTop={3}>
      <Link to="/" style={navItemStyle}>
        <img src={Logo} width={125} quality={95} alt="A colabo logo" />
      </Link>
    </Box>
    <Box px={4} py={2}>
      <Link to="/" activeStyle={navItemActiveStyle} style={navItemStyle}>
        ABOUT
      </Link>
    </Box>
    <Box px={4} py={2}>
      <Link
        activeStyle={navItemActiveStyle}
        style={navItemStyle}
        to="/team"
        partiallyActive={true}
      >
        TEAM
      </Link>
    </Box>
    <Box px={4} py={2}>
      <Link
        activeStyle={navItemActiveStyle}
        style={navItemStyle}
        to="/research"
        partiallyActive={true}
      >
        RESEARCH
      </Link>
    </Box>
    <Box px={4} py={2}>
      <Link
        activeStyle={navItemActiveStyle}
        style={navItemStyle}
        to="/contact"
        partiallyActive={true}
      >
        CONTACT
      </Link>
    </Box>
    <Box px={4} py={2}>
      <Link
        activeStyle={navItemActiveStyle}
        style={navItemStyle}
        to="/notebook"
        partiallyActive={true}
      >
        NOTEBOOK
      </Link>
    </Box>
    <Box px={4} py={2}>
      <ThemeSelector />
    </Box>
  </Flex>
)

const ThemeSelector = () => {
  const [_colorMode, setColorMode] = useColorMode()
  const handleClick = mode => {
    setColorMode(mode)
  }
  return (
    <Flex>
      {colors.map(color => (
        <Box
          as="span"
          onClick={() => handleClick(color)}
          key={color}
          sx={{
            width: "1em",
            height: "1em",
            border: "1px solid #000",
            cursor: "pointer",
            mr: 1,
            background: theme => {
              if (color === "default") return "#fff"
              return theme.rawColors.modes[color].background
            },
          }}
        />
      ))}
    </Flex>
  )
  // return colors.map(color => <div></div>)
}

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const [_colorMode, setColorMode] = useColorMode()

  useEffect(() => {
    //   let usedThemes = []
    //   let selectableThemes = colors
    //   const interval = setInterval(() => {
    //     if (selectableThemes.length === 0) {
    //       selectableThemes = colors
    //       usedThemes = []
    //     }
    //     const used = [...usedThemes, randomColor]
    //     const selectable = selectableThemes.filter(x => used.indexOf(x) === -1)
    //     usedThemes = used
    //     selectableThemes = selectable
    const randomColor = colors[Math.floor(Math.random() * colors.length)]
    setColorMode(randomColor)
    //   }, 10000)
    //   return () => clearInterval(interval)
  }, [])

  return (
    <Box className="global-wrapper" data-is-root-path={isRootPath}>
      <Flex>
        <Box
          sx={{
            zIndex: 10,
            maxHeight: "calc(100vh - 64px)",
            position: "sticky",
            top: 0,
            bottom: "auto",
            overflowX: "visible",
            overflowY: "auto",
            flex: "none",
            display: "block",
          }}
        >
          <NavBar location={location.pathname} />
        </Box>
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
