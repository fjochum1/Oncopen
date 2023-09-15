import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Link,
	Switch,
	Text,
	useColorModeValue,
  } from "@chakra-ui/react";

  import React, { useState } from "react";
  import AuthApi from "../../api/auth";
  import { useAuth } from "../../auth-context/auth.context";
  import { useHistory } from "react-router-dom";
  import '@fontsource/bebas-neue';

  function SignUp() {
	const [formData, setFormData] = useState({});
	const [error, setError] = useState("");

	const history = useHistory();
	const auth = useAuth();
	const user = auth ? auth.user : null;

	const textColor = useColorModeValue("gray.700", "white");
	const bgColor = useColorModeValue("white", "gray.700");

	const handleChange = e => {
	  setFormData({
		...formData,
		[e.target.name]: e.target.value
	  })
	}

	const handleSubmit = e => {
	  e.preventDefault();
	  AuthApi.Register(formData).then(response => {
		if(response.data.success) {
		  return history.push("/auth/signin");
		} else {
		  setError(response.data.msg)
		}
	  }).catch(error => {
		if (error.response) {
		  return setError(error.response.data.msg);
		}
		return setError("There has been an error.");
	  })
	}

	return (
	<form onSubmit={handleSubmit}>
	  <Flex
		direction='column'
		alignSelf='center'
		justifySelf='center'
		overflow='hidden'
		onSubmit={handleSubmit}>
		<Box
		  position='absolute'
		  minH={{ base: "70vh", md: "50vh" }}
		  w={{ md: "calc(100vw - 50px)" }}
		  borderRadius={{ md: "15px" }}
		  left='0'
		  right='0'
		  bgRepeat='no-repeat'
		  overflow='hidden'
		  zIndex='-1'
		  top='0'
		  bgSize='cover'
		  mx={{ md: "auto" }}
		  mt={{ md: "14px" }}>
		  </Box>
		<Flex
		  direction='column'
		  textAlign='center'
		  justifyContent='center'
		  align='center'
		  mt='6.5rem'>
		  <Text fontSize='50px' color='#9cb1a4' fontFamily="Bebas Neue, sans-serif">
			Welcome!
		  </Text>
		</Flex>
		<Flex alignItems='center' justifyContent='center' mb='60px' mt='20px'>
		  {user && user.token ? (
			<Text
			  fontSize='xl'
			  color={textColor}
			  fontWeight='bold'
			  textAlign='center'
			  mb='22px'>
				You are already signed in.
			</Text>
		  ) : (
		  <Flex
			direction='column'
			w='445px'
			background='transparent'
			borderRadius='15px'
			p='40px'
			mx={{ base: "100px" }}
			bg={bgColor}
			boxShadow='0 20px 27px 0 rgb(0 0 0 / 5%)'>
			<Text
			  fontSize='xl'
			  color='gray.700'
			  fontWeight='bold'
			  textAlign='center'
			  mb='22px'>
			  Register
			</Text>
			<FormControl>
			<FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
				Firstname
			  </FormLabel>
			  <Input
				fontSize='sm'
				ms='4px'
				borderRadius='15px'
				type='text'
				placeholder='Your firstname'
				mb='24px'
				size='lg'
				name="firstname"
				onChange={handleChange}
			  />
			  <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
				Name
			  </FormLabel>
			  <Input
				fontSize='sm'
				ms='4px'
				borderRadius='15px'
				type='text'
				placeholder='Your family name'
				mb='24px'
				size='lg'
				name="name"
				onChange={handleChange}
			  />
			  <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
				Username
			  </FormLabel>
			  <Input
				fontSize='sm'
				ms='4px'
				borderRadius='15px'
				type='text'
				placeholder='Your username'
				mb='24px'
				size='lg'
				name="username"
				onChange={handleChange}
			  />
			  <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
				Email
			  </FormLabel>
			  <Input
				fontSize='sm'
				ms='4px'
				borderRadius='15px'
				type='email'
				placeholder='Your email address'
				mb='24px'
				size='lg'
				name="email"
				onChange={handleChange}
			  />
			  <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
				Password
			  </FormLabel>
			  <Input
				fontSize='sm'
				ms='4px'
				borderRadius='15px'
				type='password'
				placeholder='Your password'
				mb='24px'
				size='lg'
				name="password"
				onChange={handleChange}
			  />
			  <FormControl display='flex' alignItems='center' mb='24px'>
				<Switch id='remember-login' colorScheme='teal' me='10px' />
				<FormLabel htmlFor='remember-login' mb='0' fontWeight='normal'>
				  Remember me
				</FormLabel>
			  </FormControl>
			  <Flex
				flexDirection='column'
				justifyContent='center'
				alignItems='center'
				maxW='100%'
				mt='0px'>
				<Text color="red" marginBottom="15px" fontWeight='medium'>
				  {error}
				</Text>
			  </Flex>
			  <Button
				//onClick={handleSubmit}
				type='submit'
				bg='#759284'
				fontSize='14px'
				color='white'
				fontWeight='bold'
				w='100%'
				h='45'
				mb='24px'
				_hover={{
				  bg: "#94aca4",
				}}
				_active={{
				  bg: "#94aca4",
				}}>
				SIGN UP
			  </Button>
			</FormControl>
			<Flex
			  flexDirection='column'
			  justifyContent='center'
			  alignItems='center'
			  maxW='100%'
			  mt='0px'>
			  <Text color={textColor} fontWeight='medium'>
				Already have an account?
				<Link
				  color="#94aca4"
				  ms='5px'
				  href="#/auth/signin"
				  fontWeight='bold'>
				  Sign In
				</Link>
			  </Text>
			</Flex>
		  </Flex>)}
		</Flex>
	  </Flex>
	  </form>
	);
  }

  export default SignUp;

//// Chakra imports
//import {
//  Box,
//  Button,
//  Flex,
//  FormErrorMessage,
//  FormControl,
//  FormLabel,
//  Input,
//  Link,
//  Switch,
//  Text,
//  useColorModeValue,
//} from "@chakra-ui/react";
//// Assets
//import React, { useEffect, useState } from "react";
//import { useHistory } from "react-router-dom";
//import axios from 'axios';
//import AuthApi from "../../api/auth";
//import { useAuth } from "../../auth-context/auth.context";

//function SignUp() {
//  const textColor = useColorModeValue("gray.700", "white");
//  const bgColor = useColorModeValue("white", "gray.700");
//  const history = useHistory();
//  const [name, setName] = useState("");
//  const [email, setEmail] = useState("");
//  const [password, setPassword] = useState("");
//  const [formErrors, setFormErrors] = useState({name: "", email: ""});
//  const [data, setData] = useState("");
//  const [formData, setFormData] = useState({});
//  const [error, setError] = useState("");


//  // Create function to validate form data
//  const validateForm = () => {
//	let newErrors = {name: "", email: ""};

//	if (!name || name === "") {
//	  newErrors.name = "Name is required";
//	}

//	if (!email || email === "") {
//	  newErrors.email = "Email is required";
//	} else if (
//	  !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)
//	) {
//	  newErrors.email = "Please enter a valid email";
//	}

//	return newErrors;
//  };

////  const handleSubmit = async (e) => {
////	console.log('handleSubmit was called');
////	e.preventDefault();
////	const newErrors = validateForm();

////	if (!newErrors.name && !newErrors.email) {
////	  try {
////		console.log('sending request to server');
////		const response = await axios.post('http://localhost:3000/users', { name, email, password });
////		console.log('server responded with', response);
////		const data = response.data;

////		if (response.status === 201) {
////		  alert(`Welcome, ${data.user.name}!`);
////		  history.push("/admin/profile");
////		} else {
////		  // sign-up failed - set formErrors
////		  setFormErrors({
////			name: data.errors.name,
////			email: data.errors.email
////		  });
////		  alert(`Sign-up failed: ${data.message}`);
////		}
////	  } catch (error) {
////		// form is not valid - set formErrors
////		console.error(`Error: ${error}`);
////		setFormErrors(newErrors);
////	  }
////	} else {
////	  // form is not valid - set formErrors
////	  setFormErrors(newErrors);
////	}
////  };

//const handleSubmit = e => {
//    e.preventDefault();
//    AuthApi.Register(formData).then(response => {
//      if(response.data.success) {
//        return history.push("/auth/signin");
//      } else {
//        setError(response.data.msg)
//      }
//    }).catch(error => {
//      if (error.response) {
//        return setError(error.response.data.msg);
//      }
//      return setError("There has been an error.");
//    })
//  }

//  return(
//	<form onSubmit={handleSubmit}>
//    <Flex
//      direction='column'
//      alignSelf='center'
//      justifySelf='center'
//      overflow='hidden'
//	  onSubmit={handleSubmit}>
//      <Box
//        position='absolute'
//        minH={{ base: "70vh", md: "50vh" }}
//        w={{ md: "calc(100vw - 50px)" }}
//        borderRadius={{ md: "15px" }}
//        left='0'
//        right='0'
//        bgRepeat='no-repeat'
//        overflow='hidden'
//        zIndex='-1'
//        top='0'
//        bgSize='cover'
//        mx={{ md: "auto" }}
//        mt={{ md: "14px" }}>
//		</Box>
//      <Flex
//        direction='column'
//        textAlign='center'
//        justifyContent='center'
//        align='center'
//        mt='6.5rem'
//        mb='30px'>
//        <Text fontSize='4xl' color='Black' fontWeight='bold'>
//          Welcome!
//        </Text>
//      </Flex>
//      <Flex alignItems='center' justifyContent='center' mb='60px' mt='20px'>
//        <Flex
//          direction='column'
//          w='445px'
//          background='transparent'
//          borderRadius='15px'
//          p='40px'
//          mx={{ base: "100px" }}
//          bg={bgColor}
//          boxShadow='0 20px 27px 0 rgb(0 0 0 / 5%)'>
//          <Text
//            fontSize='xl'
//            color={textColor}
//            fontWeight='bold'
//            textAlign='center'
//            mb='22px'>
//            Register
//          </Text>
//          <FormControl isInvalid={formErrors.name}>
//            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
//              Name
//            </FormLabel>
//            <Input
//              fontSize='sm'
//              ms='4px'
//              borderRadius='15px'
//              type='text'
//              placeholder='Your full name'
//              mb='24px'
//              size='lg'
//			  onChange={e => setName(e.target.value)}/>
//			  <FormErrorMessage>{formErrors.name}</FormErrorMessage>
//            </FormControl>
//            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
//              Email
//            </FormLabel>
//			<FormControl isInvalid={formErrors.email}>
//            <Input
//              fontSize='sm'
//              ms='4px'
//              borderRadius='15px'
//              type='email'
//              placeholder='Your email address'
//              mb='24px'
//              size='lg'
//			  onChange={e => setEmail(e.target.value)}/>
//			  <FormErrorMessage>{formErrors.email}</FormErrorMessage>
//            </FormControl>
//			<FormControl isInvalid={formErrors.password}>
//            <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
//              Password
//            </FormLabel>
//            <Input
//              fontSize='sm'
//              ms='4px'
//              borderRadius='15px'
//              type='password'
//              placeholder='Your password'
//              mb='24px'
//              size='lg'
//			  onChange={e => setPassword(e.target.value)}/>
//			  <FormErrorMessage>{formErrors.password}</FormErrorMessage>
//            </FormControl>
//            <FormControl display='flex' alignItems='center' mb='24px'>
//              <Switch id='remember-login' colorScheme='teal' me='10px' />
//              <FormLabel htmlFor='remember-login' mb='0' fontWeight='normal'>
//                Remember me
//              </FormLabel>
//            </FormControl>
//            <Button
//              type='submit'
//              bg='#759284'
//              fontSize='10px'
//              color='white'
//              fontWeight='bold'
//              w='100%'
//              h='45'
//              mb='24px'
//              _hover={{
//                bg: "#94aca4",
//              }}
//              _active={{
//                bg: "#94aca4",
//              }}>
//			  {/*onClick={handleSubmit}*/}
//              SIGN UP
//            </Button>
//          <Flex
//            flexDirection='column'
//            justifyContent='center'
//            alignItems='center'
//            maxW='100%'
//            mt='0px'>
//            <Text color={textColor} fontWeight='medium'>
//              Already have an account?
//              <Link
//                color="#94aca4"
//                as='span'
//                ms='5px'
//                href='#'
//                fontWeight='bold'>
//                Sign In
//              </Link>
//            </Text>
//          </Flex>
//        </Flex>
//      </Flex>
//    </Flex>
//	</form>
//  );
//}

//export default SignUp;
