import React, { useState } from "react";
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import AuthApi from "../../api/auth";
import { useAuth } from "../../auth-context/auth.context";
import { useHistory } from "react-router-dom";
import '@fontsource/bebas-neue';

function SignIn() {
  const [formData, setFormData] = useState({
    'email': '',
    'password': ''
  });
  const [error, setError] = useState("");

  const history = useHistory();
  const { user, setUser } = useAuth();

  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    AuthApi.Login(formData).then(response => {
      if(response.data.success) {
        return setProfile(response);
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

  const setProfile = (response) => {
    let user = { ...response.data.user };
    user.token = response.data.token;
    user = JSON.stringify(user);
    setUser(user);
    localStorage.setItem("user", user);
    return history.push("/dashboard");
  };
  return (
    <Flex position='relative' mb='40px'>
      <Flex
	    justifyContent='center'
		alignItems='center'
		direction='column'
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w='100%'
        maxW='1044px'
        mx='auto'
        mb='30px'
        pt={{ sm: "100px", md: "0px" }}>
        {user && user.token ? (
        <Flex
          alignItems='center'
          justifyContent='start'
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}>
          <Flex
            direction='column'
            w='100%'
            background='transparent'
            p='48px'
            mt={{ md: "150px", lg: "80px" }}>
            <Heading color={titleColor} fontSize='32px' mb='10px'>
              You are already signed in.
            </Heading>
          </Flex>
        </Flex>
        ) : (
        <Flex
          style={{ userSelect: "none" }}
          w={{ base: "100%", md: "50%", lg: "42%" }}>
          <Flex
		    justifyContent='center'
			alignItems='center'
            direction='column'
            w='100%'
            background='white'
            p='48px'
			boxShadow='0 20px 27px 0 rgb(0 0 0 / 5%)'
            mt={{ md: "150px", lg: "80px" }}>
            <Text color='#9cb1a4' fontSize='36px' mb='10px' marginBottom='50px' fontFamily="Bebas neue, sans-serif">
              Welcome Back!
            </Text>
            <FormControl>
              <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
                Email
              </FormLabel>
              <Input
                borderRadius='15px'
                mb='24px'
                fontSize='sm'
                type='text'
                placeholder='Your email adress'
                size='lg'
                onChange={handleChange}
                name="email"
                value={formData?.email}
              />
              <FormLabel ms='4px' fontSize='sm' fontWeight='bold'>
                Password
              </FormLabel>
              <Input
                borderRadius='15px'
                mb='36px'
                fontSize='sm'
                type='password'
                placeholder='Your password'
                size='lg'
                onChange={handleChange}
                name="password"
                value={formData?.password}
              />
              <FormControl display='flex' alignItems='center'>
                <Switch id='remember-login' colorScheme='teal' me='10px' />
                <FormLabel
                  htmlFor='remember-login'
                  mb='0'
                  ms='1'
                  fontWeight='normal'>
                  Remember me
                </FormLabel>
              </FormControl>
              <Flex
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                maxW='100%'
                mt='0px'>
                <Text color="red" marginTop="10px" fontWeight='medium'>
                  {error}
                </Text>
              </Flex>
              <Button
                onClick={handleSubmit}
                fontSize='10px'
                type='submit'
                bg='#759284'
                w='100%'
                h='45'
                mb='20px'
                color='white'
                mt='20px'
				_hover={{
				  bg: "#94aca4",
				}}
				_active={{
				  bg: "#94aca4",
				}}>
                SIGN IN
              </Button>
            </FormControl>
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              maxW='100%'
              mt='0px'>
              <Text color={textColor} fontWeight='medium'>
                Don't have an account?
                <Link color="#94aca4" href="#/auth/signup" ms='5px' fontWeight='bold'>
                  Sign Up
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>)}
        <Box
          display={{ base: "none", md: "block" }}
          overflowX='hidden'
          h='100%'
          w='40vw'
          position='absolute'
          right='0px'>
          <Box
            w='100%'
            h='100%'
            bgSize='cover'
            bgPosition='50%'
            position='absolute'
            borderBottomLeftRadius='20px'></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignIn;
