/* eslint-disable no-unused-vars */
import React, { useCallback, useState, useEffect } from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types"; // Import PropTypes
import { Room } from "y-webrtc";

function LobbyScreen() {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <>
      <Flex
        height="100vh"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box textAlign="center" mb={5}>
          <Heading>Join Room</Heading>
        </Box>
        <FormControl
          onSubmit={handleSubmit}
          as="form"
          width="350px"
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="1px 1px 3px rgba(0,0,0,0.3)"
          mb={10}
        >
          <FormLabel> Email Id</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormLabel mt={5}>Room Number</FormLabel>
          <Input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <Center>
            <Button
              width="60%"
              height="40px"
              colorScheme="green"
              mt={7}
              type="submit"
            >
              Join
            </Button>
          </Center>
        </FormControl>
        <Text fontSize="medium" color="white">
          Made with ❤️ by{" "}
          <Link
            color="green.100"
            href="https://www.linkedin.com/in/shivam-bhushan/"
          >
            Shivam
          </Link>
        </Text>
      </Flex>
    </>
  );
}

export default LobbyScreen;
