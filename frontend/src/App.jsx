/* eslint-disable no-unused-vars */
import { Box, Container, Heading } from "@chakra-ui/react";
// import CodeEditor from "./components/codeeditor/CodeEditor";
import { Router, Route, Routes } from "react-router-dom";
import LobbyScreen from "./screens/LobbyScreen";
import RoomScreen from "./screens/RoomScreen";

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/" element={<LobbyScreen />} />
        <Route path="/room/:roomId" element={<RoomScreen />} />
      </Routes>
    </Box>
  );
}

export default App;
