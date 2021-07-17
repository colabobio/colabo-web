import React from "react"
import { Link } from "gatsby"
import { Box, Heading, Flex } from "@theme-ui/components"

import Image from "./image"

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
}
export const AccordionItem = ({
  isCollapsed,
  handleClick,
  title,
  icon,
  children,
}) => {
  return (
    <Box mb={6}>
      <div
        className="accordion-button"
        role="button"
        tabIndex="0"
        onMouseEnter={handleClick}
      >
        <Box mb={4} sx={{ textAlign: "center" }}>
          <article
            className="post-list-item"
            itemScope
            itemType="http://schema.org/Article"
          >
            <Flex
              sx={{
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  width: ["100px", "100px", "75px"],
                  marginBottom: 4,
                }}
                mr={3}
              >
                <Image fluidPath={icon} />
              </Box>
              <Heading>{title}</Heading>
            </Flex>
          </article>
        </Box>
      </div>
      <div
        className={`accordion-item ${isCollapsed ? "collapsed" : "expanded"}`}
        aria-expanded={isCollapsed}
      >
        {children}
      </div>
    </Box>
  )
}

const Accordion = ({ defaultIndex, onItemClick, data }) => {
  const [bindIndex, setBindIndex] = React.useState(defaultIndex)

  const changeItem = itemIndex => {
    if (typeof onItemClick === "function") onItemClick(itemIndex)
    if (itemIndex !== bindIndex) setBindIndex(itemIndex)
  }

  return (
    <>
      {data.map(item => (
        <Link style={linkStyle} to={item.itemLink} key={item.slug}>
          <AccordionItem
            isCollapsed={bindIndex !== item.index}
            label={item.label}
            handleClick={() => changeItem(item.index)}
            title={item.title}
            icon={item.icon}
            children={item.content}
          />
        </Link>
      ))}
    </>
  )
}

export default Accordion
