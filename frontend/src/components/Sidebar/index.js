/*eslint-disable*/
// chakra imports
import {
	Box, useColorModeValue
  } from "@chakra-ui/react";
  import React from "react";
  import SidebarContent from "./SidebarContent";

  function Sidebar({id, ...props}) {
	// to check for active links and opened collapses
	const mainPanel = React.useRef();
	let variantChange = "0.2s linear";

	const { logoText, routes, sidebarVariant, layoutType } = props;

	// BRAND
	// Chakra Color Mode
	let sidebarBg = "white";
	let sidebarRadius = "20px";
	let sidebarMargins = "0px";
	if (sidebarVariant === "opaque") {
	  sidebarBg = useColorModeValue("white", "white");
	  sidebarRadius = "10px";
	  sidebarMargins = "16px 0px 16px 16px";
	}

	// SIDEBAR
	return (
	  <Box ref={mainPanel}>
		<Box display={{ sm: "none", xl: "block" }} position="fixed">
		  <Box
			bg={sidebarBg}
			transition={variantChange}
			w="260px"
			maxW="260px"
			ms={{
			  sm: "16px",
			}}
			my={{
			  sm: "16px",
			}}
			h="calc(100vh - 32px)"
			ps="20px"
			pe="20px"
			m={sidebarMargins}
			borderRadius={sidebarRadius}
			position="relative"
			boxShadow="0px 3px 7px rgba(0, 0, 0, 0.09)"
		  >
			{/*<Box
			  width="3px"
			  backgroundColor="black"
			  position="absolute"
			  right="0"
			  top="35%"
			  height="250px"
			  transform="translateY(-50%)"
			/>*/}
			<SidebarContent
			  routes={routes}
			  logoText={"Oncohub.io"}
			  display="none"
			  sidebarVariant={sidebarVariant}
			  layoutType={layoutType}
			  id={id}
			/>
		  </Box>
		</Box>
	  </Box>
	);
  }

  export default Sidebar;
