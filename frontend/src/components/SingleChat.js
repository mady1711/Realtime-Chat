import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box , Text} from '@chakra-ui/react';
import {IconButton} from '@chakra-ui/button'
import { ArrowBackIcon } from '@chakra-ui/icons';

const SingleChat = ({fetchAgain ,setFetchAgain}) => {

    const {user,selectedChat,setSelectedChat} = ChatState();
  return (
    <>
        {selectedChat ?(
            <>
            <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
            >
                <IconButton
                d={{ base: "flex", md: "none" }}
                icon={<ArrowBackIcon />}
                onClick={() => setSelectedChat("")}
                />
            </Text>
            </>
        ) :(
            <Box display="flex" alignItems="center" justifyContent="center" height='100%'>
                <Text fontSize="3x1" pb={3} fontFamily="Work sans">
                    Click on a user to start chatting 
                </Text>
            </Box>
        )}
    </>
  )
}

export default SingleChat