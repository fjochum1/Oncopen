/*eslint-disable*/
// chakra imports
import {
	Box,
	Button, Flex,
	Link,
	Stack,
	Text,
	useColorModeValue
} from "@chakra-ui/react";
import IconBox from "components/Icons/IconBox";
//import { CreativeTimLogo } from "components/Icons/Icons";
import logo from 'assets/img/LogoOncohub.png';
import { Separator } from "components/Separator/Separator";
import React from "react";
import { NavLink, useLocation, matchPath } from "react-router-dom";
import useRoutes from "routes";
import useRoutesPatient from "routesPatient";
import '@fontsource/bebas-neue';
import '@fontsource/lato';
import '@fontsource/inconsolata';

// this function creates the links and collapses that appear in the sidebar (left menu)

const SidebarContent = ({ logoText, layoutType, id }) => {
	const routes = layoutType === 'admin' ? useRoutes() : useRoutesPatient();
	// to check for active links and opened collapses
	let location = useLocation();
	// this is for the rest of the collapses
	const [state, setState] = React.useState({});

	// verifies if routeName is the one active (in browser input)
	//  const activeRoute = (routeName) => {
	//    return location.pathname === routeName ? "active" : "";
	//  };
	const activeRoute = (routeName) => {
		const match = matchPath(location.pathname, {
			path: routeName,
			exact: true
		});

		return match ? "active" : "";
	};

	const createLinks = (routes) => {
		// Chakra Color Mode
		//const activeBg = "rgba(251,232,217,0.6)";
		const activeBg = useColorModeValue("rgba(249,249,249,255)", "white");
		const inactiveBg = useColorModeValue("white", "gray.700");
		const activeColor = useColorModeValue("black", "white");
		const inactiveColor = useColorModeValue("black", "gray.400");

		return routes.map((prop, key) => {
			if (prop.redirect) {
				return null;
			}
			if (prop.category) {
				var st = {};
				st[prop["state"]] = !state[prop.state];
				return (
					<div key={prop.name}>
						<Text
							color="black"
							//fontFamily="lato, sans-serif"
							fontSize="20"
							fontWeight="bold"
							//  mb={{
							//    xl: "5px",
							//  }}
							mx="auto"
							ps={{
								sm: "10px",
								xl: "16px",
							}}
							py="12px"
						>
							{document.documentElement.dir === "rtl"
								? prop.rtlName
								: prop.name}
						</Text>
						{createLinks(prop.views)}
					</div>
				);
			}
			return (
				<NavLink to={`${prop.layout}${prop.path.replace(':id', id)}`} key={prop.name}>
					{activeRoute(prop.layout + prop.path) === "active" ? (
						<Button
							boxSize="initial"
							justifyContent="flex-start"
							alignItems="center"
							bg={activeBg}
							mb={{
								xl: "12px",
							}}
							mx={{
								xl: "auto",
							}}
							ps={{
								sm: "10px",
								xl: "16px",
							}}
							py="12px"
							borderRadius="15px"
							_hover={{
								".icon-box-hover": {
									borderColor: "rgba(99, 135, 118, 0.8)"
								}
							}}
							w="100%"
							_active={{
								bg: "inherit",
								transform: "none",
								borderColor: "transparent",
							}}
							_focus={{
								boxShadow: "none",
							}}
						>
							<Flex>
								{typeof prop.icon === "string" ? (
									<Icon>{prop.icon}</Icon>
								) : (
									<IconBox
										className="icon-box-hover"
										bg="white"
										color="black"
										borderColor="black"
										borderWidth="3px"
										h="25px"
										w="25px"
										me="10px"
										mr="-10px"
										ml="-14px"
										borderRadius="10px"
									>
										{prop.icon}
									</IconBox>
								)}
								<Text color={activeColor} ml="25px" my="auto" fontSize="sm">
									{document.documentElement.dir === "rtl"
										? prop.rtlName
										: prop.name}
								</Text>
							</Flex>
						</Button>
					) : (
						<Button
							boxSize="initial"
							justifyContent="flex-start"
							alignItems="center"
							bg="transparent"
							mb={{
								xl: "12px",
							}}
							mx={{
								xl: "auto",
							}}
							py="12px"
							ps={{
								sm: "10px",
								xl: "16px",
							}}
							borderRadius="15px"
							_hover="none"
							w="100%"
							_active={{
								bg: "inherit",
								transform: "none",
								borderColor: "transparent",
							}}
							_focus={{
								boxShadow: "none",
							}}
						>
							<Flex>
								{/*{typeof prop.icon === "string" ? (
									<Icon>{prop.icon}</Icon>
								) : (
									<IconBox
										bg={inactiveBg}
										color="teal.300"
										h="30px"
										w="30px"
										me="12px"
									>
										{prop.icon}
									</IconBox>
								)}*/}
								<Text color={inactiveColor} ml="25px" my="auto" fontSize="sm">
									{document.documentElement.dir === "rtl"
										? prop.rtlName
										: prop.name}
								</Text>
							</Flex>
						</Button>
					)}
				</NavLink>
			);
		});
	};

	const links = <>{createLinks(routes)}</>;

	return (
		<>
			<Box pt={"25px"} mb="12px">
				<Link
					href={`${process.env.PUBLIC_URL}/#/`}
					target="_blank"
					display="flex"
					lineHeight="100%"
					mb="30px"
					fontWeight="bold"
					justifyContent="center"
					alignItems="center"
					fontSize="11px"
				>
					<img src={logo} alt="Logo" />
					{/*<Text fontSize="sm" mt="3px">
          {logoText}
        </Text>*/}
				</Link>
				<Separator></Separator>
			</Box>
			<Stack direction="column" mb="40px">
				<Box>{links}</Box>
			</Stack>
			{/*<SidebarLogOut/>*/}
		</>
	)
}

export default SidebarContent
