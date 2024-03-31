/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import ReactPlayer from "react-player";
import { Box, Button, Flex, HStack, Heading } from "@chakra-ui/react";
import peer from "../services/peer";
import CodeEditor from "../components/codeeditor/CodeEditor.jsx";

function RoomScreen() {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [isFirstUser, setIsFirstUser] = useState(true);
  const [remoteStreamReceived, setRemoteStreamReceived] = useState(false);
  const [myStreamShared, setMyStreamShared] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`${email} has joined`);
    setRemoteSocketId(id);
    setIsFirstUser((prevState) => !prevState);
  }, []);

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
    setMyStreamShared(true);
    if (remoteStreamReceived) {
      setConnected(true);
    }
  }, [myStream, remoteStreamReceived]);

  const handleCallUser = useCallback(async () => {
    // switch on your stream
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer(); // creating your offer
    socket.emit("user:call", { to: remoteSocketId, offer }); // sending the offer to other user
    setMyStream(stream); // now we can render this stream to the local user
    sendStreams();
  }, [remoteSocketId, sendStreams, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log("incomming call", from, offer);
      const ans = await peer.getAnswer(offer); //create answer
      //send answer to first user
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("call accepted");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncoming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS");
      setRemoteStream(remoteStream[0]);
      setRemoteStreamReceived(true);
      if (myStreamShared) {
        setConnected(true);
      }
    });
  });

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncoming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined); // deregested handler
      socket.off("incomming:call", handleIncommingCall); // deregested handler
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncoming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncoming,
    handleNegoNeedFinal,
  ]);

  return (
    <HStack>
      <Flex
        height="100vh"
        w="15vw"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Heading fontSize="x-large" mb={5}>
          {connected
            ? "Connected"
            : remoteSocketId
            ? `User 2 has joined`
            : "No one in room"}
        </Heading>
        {isFirstUser && myStream && !myStreamShared && (
          <Button colorScheme="blue" onClick={sendStreams}>
            Send Stream
          </Button>
        )}
        {!isFirstUser && remoteSocketId && !remoteStreamReceived && (
          <Button w={100} colorScheme="green" onClick={handleCallUser}>
            Call
          </Button>
        )}
        {myStream && (
          <>
            {/* <Heading fontSize="medium">My Stream</Heading> */}
            <ReactPlayer
              playing
              muted
              width="300px"
              height="300px"
              url={myStream}
            ></ReactPlayer>
          </>
        )}
        {remoteStream && (
          <>
            {/* <Heading>Remote Stream</Heading> */}
            <ReactPlayer
              playing
              muted
              width="300px"
              height="300px"
              url={remoteStream}
            ></ReactPlayer>
          </>
        )}
      </Flex>
      <Box w="100vw">
        <CodeEditor />
      </Box>
    </HStack>
  );
}

export default RoomScreen;
