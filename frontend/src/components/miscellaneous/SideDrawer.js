import { Avatar, Box, Button, HStack, Menu, MenuButton, MenuList, MenuItem, Text, Tooltip, Drawer, DrawerOverlay, DrawerHeader, DrawerContent, DrawerBody, Input, useToast, Spinner } from '@chakra-ui/react';
import { px } from 'framer-motion';
import React, { useState } from 'react'
import {BellIcon, ChevronDownIcon} from '@chakra-ui/icons'
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';

const SideDrawer = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();


    const [search, setSearch] = useState();
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState();

    const { user , setSelectedChat, chats, setChats } = ChatState();
    const history = useHistory();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
    };

    const toast = useToast();

    const handleSearch = async() => {
        if(!search){
            toast({
                title: "Please Enter something in Search",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top-left",
            })
            return;
        }
        try {
            setLoading(true);

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`/api/user?search=${search}`, config);

            setLoading(false);
            setSearchResult(data);

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            return;
        }
    };

    const accessChat = async(userId) => {
        try {
            setLoadingChat(true);
            const config = {
                headers: {
                    "Content-type":"application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.post('/api/chat',{userId}, config);

            if(!chats.find((c)=> c._id === data._id)){
                setChats([data, ...chats]);
            }

            setSelectedChat(data);
            setLoadingChat(false);
            onClose();
        } catch (error) {
            toast({
                title: "Error Fetching the Chats",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
            return;
        }
    };

  return (
    <>
        <Box
            d="flex"
            justifyContent="space-between"
            alignItems="center"
            bg={'white'}
            w="100%"
            p="5px 10px 5px 10px"
            borderWidth={'5px'}
        >
            <HStack justifyContent='space-between'>   
                <Tooltip label = "Search Users to chat" hasArrow placement="bottom-end">
                    <Button variant="ghost" onClick={onOpen}>
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <Text d={{base:"none", md:"flex"}} px="4">
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
                <Text fontSize={'2xl'} fontFamily="Work sans">
                    Lets-Connect
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <BellIcon fontSize={'2xl'} m={2}/>                   
                        </MenuButton>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
                            <Avatar size={'sm'} cursor={'pointer'} name={user.name} src={user.pic}/>
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </HStack>
        </Box>

        <Drawer placement='left' onClose={onClose} isOpen={isOpen} >
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>

                <DrawerBody>
                    <Box d="flex" pb={2}>
                        <HStack>
                            <Input 
                                placeholder="Search by Name or Email"
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button 
                                onClick={handleSearch}
                            >Go</Button>
                        </HStack>
                    </Box>
                    {loading?(
                        <ChatLoading/>
                    ):(
                        searchResult?.map((user) => (
                            <UserListItem
                                key={user._id}
                                user={user}
                                handleFunction={() => accessChat(user._id)}
                            />
                        ))
                    )}
                    {loadingChat && <Spinner ml="auto" d="flex" />}
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    </>
  )
}

export default SideDrawer
