import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box , FormControl, HStack, Input, Spinner, Text, useToast} from '@chakra-ui/react';
import {IconButton} from '@chakra-ui/button'
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../config/ChatLogics'
import ProfileModal from './miscellaneous/ProfileModal';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import axios from 'axios';
import './styles.css';
import ScrollableChat from './ScrollableChat';

const SingleChat = ({fetchAgain ,setFetchAgain}) => {

    const toast = useToast();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    

    const {user,selectedChat,setSelectedChat} = ChatState();

    const fetchMessages = async () => {
        if(!selectedChat) return;
        try {
            const config = {
                headers:{
                    Authorization: `Bearer ${user.token}`,
                },
            };

            setLoading(true);

            const { data } = await axios.get(`/api/message/${selectedChat._id}`,config);

            console.log(messages);
            setMessages(data);
            setLoading(false);

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [selectedChat]);

    const sendMessage = async (event) => {
        //console.log("started");
        if(event.key === "Enter" && newMessage){
            try {
                //console.log("try started");
                const config = {
                    headers:{
                        "Conten-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    }
                }
                //console.log("config completed");

                setNewMessage("");

                const { data } = await axios.post(
                    "/api/message",
                    {
                        content: newMessage,
                        chatId: selectedChat._id
                    },
                    config
                );

                console.log(data);

                setMessages([...messages,data]);

            } catch (error) {
                toast({
                    title: "Error Occured!--",
                    description: "Failed to Load the Messages",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                  });
            }
        }
    };

    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        // typing indicator logic
    };

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
            justifyContent="space-between"
            alignItems="center"
            >
                <HStack justifyContent="space-between">
                    <IconButton
                    d={{ base: "flex", md: "none" }}
                    icon={<ArrowBackIcon />}
                    onClick={() => setSelectedChat("")}
                    />
                    {!selectedChat.isGroupChat ? (
                        <>
                            { getSender(user,selectedChat.users) }
                            <ProfileModal user={ getSenderFull(user,selectedChat.users) } />
                        </>
                    ) : (
                            <>
                                { selectedChat.chatName.toUpperCase() }
                                <UpdateGroupChatModal 
                                    fetchAgain = { fetchAgain }
                                    setFetchAgain = { setFetchAgain }
                                    fetchMessages = {fetchMessages}
                                />
                            </>                    
                    )}
                </HStack>
            </Text>
            <Box
                display="flex"
                flexDir="column"
                justifyContent="flex-end"
                p={3}
                bg="#E8E8E8"
                width="100%"
                height="90%"
                borderRadius="lg"
                overflowY="hidden"
            >
                {loading ? (
                    <Spinner/>
                ):(
                    <div className="messages">
                        <ScrollableChat messages={messages}/>
                    </div>
                )}

                <FormControl onKeyDown={sendMessage} isRequired mt={3}>
                    <Input 
                        variant={'filled'}
                        bg={'#E0E0E0'}
                        placeholder='Enter a message..'
                        onChange={typingHandler}
                        value={newMessage}
                    />
                </FormControl>
            </Box>
            
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