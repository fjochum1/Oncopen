import React, { useState } from "react";
import { Stack, Heading, Box, FormControl, FormLabel, Input, Select, Button, ButtonGroup} from "@chakra-ui/react";



function Profile() {
  const name = localStorage.getItem("name");
  const email = localStorage.getItem("email");

  const [title, setTitle] = useState("");
  const [rpps, setRpps] = useState("");
  const [finess, setFiness] = useState("");
  const [institution, setInstitution] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle form submission, e.g. save data to localStorage
  };

  return (
    <Box fontFamily="Roboto, monospace" w='60%' justifyContent='center' mb='60px' mt='20px' as="form" onSubmit={handleSubmit}>
      <Heading mb={5} fontSize="2xl" fontFamily="Inconsolata" color="#859e91" textDecoration="underline">
	  	Prescriber profile
	  </Heading>
	  <Stack spacing={5}>
	  	<FormControl isReadOnly>
        	<FormLabel>Name</FormLabel>
        	<Input type="text" value={name} />
      	</FormControl>
      	<FormControl isReadOnly>
        	<FormLabel>Email</FormLabel>
        	<Input type="email" value={email} />
      	</FormControl>
      	<FormControl>
        	<FormLabel>Title</FormLabel>
        	<Select value={title} onChange={(e) => setTitle(e.target.value)}>
          	<option value="Mrs">Mrs</option>
          	<option value="Ms">Ms</option>
          	<option value="Dr">Dr</option>
          	<option value="Pr">Pr</option>
        	</Select>
      	</FormControl>
      	<FormControl>
        	<FormLabel>RPPS Number</FormLabel>
        	<Input type="number" value={rpps} onChange={(e) => setRpps(e.target.value)} />
      	</FormControl>
      	<FormControl>
        	<FormLabel>FINESS</FormLabel>
        	<Input type="text" value={finess} onChange={(e) => setFiness(e.target.value)} />
      	</FormControl>
      	<FormControl>
        	<FormLabel>Institution Name</FormLabel>
        	<Input type="text" value={institution} onChange={(e) => setInstitution(e.target.value)} />
      	</FormControl>
      	<FormControl>
        	<FormLabel>Institution Address</FormLabel>
        	<Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
      	</FormControl>
	  	<ButtonGroup spacing={20} mt={20}>
			<Button backgroundColor="#859e91" color="white" _hover={{ bg: "#6b8478" }} _active={{ bg: "#5a6e60" }}>
    			Validate
  			</Button>
	  	</ButtonGroup>
	  </Stack>
    </Box>
	);
}

export default Profile;
