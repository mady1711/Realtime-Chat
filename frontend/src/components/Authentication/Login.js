import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Show, VStack } from '@chakra-ui/react'

const Login = () => {

    const [name, setName] = useState();
    const [email,setEmail] = useState();
    const [password, setPassword] = useState();
    //const [confirmpassword, setConfirmpassword] = useState();
    //const [pic, setPic] = useState();
    const [show, setShow] = useState(false);


    const handleClick = () => setShow(!show);

    const submitHandler = () => {};

  return (
    <VStack spacing="5px">
        <FormControl id="first-name" isRequired>
            <FormLabel>
                Name 
            </FormLabel>
            <Input
                placeholder='Enter Your Name'
                onChange={(e)=>setName(e.target.value) }
            />
        </FormControl>
        <FormControl id="email" isRequired>
            <FormLabel>
                Email 
            </FormLabel>
            <Input
                placeholder='Enter Your Email'
                onChange={(e)=>setEmail(e.target.value) }
            />
        </FormControl>
        <FormControl id="password" isRequired>
            <FormLabel>
                Password
            </FormLabel>
            <InputGroup>
                <Input
                    type={show ? "text" : "password"}
                    placeholder='Enter Your Password'
                    onChange={(e)=>setPassword(e.target.value) }
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide":"Show"}
                    </Button>
                </InputRightElement>    
            </InputGroup>
        </FormControl>
        <Button
            colorScheme='blue'
            width="100%"
            style={{marginTop:15}}
            onClick={submitHandler}
        >
            Login
        </Button>
        <Button
            colorScheme='red'
            width="100%"
            variant="solid"
            onClick={() => {
                setEmail("guest@example.com");
                setPassword("12345678");
            }}
        >
            Get Guest User Credentials
        </Button>
    </VStack>
  )
}

export default Login
