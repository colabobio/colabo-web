import * as React from "react"
import { Link as GaLink } from "gatsby"

const containerStyle = { textDecoration: "none", color: "inherit" }

const Link = ({ to = "/", children }) => (
  <GaLink style={containerStyle} to={to}>
    {children}
  </GaLink>
)

export default Link
