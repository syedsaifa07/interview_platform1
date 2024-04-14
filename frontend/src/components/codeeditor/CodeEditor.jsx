/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { Editor } from "@monaco-editor/react";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";
import LanguageSelector from "./LanguageSelector";
import { Box, HStack } from "@chakra-ui/react";
import { CODE_SNIPPETS } from "../../constants";
import Output from "./Output";
import { useSyncedStore } from "@syncedstore/react";
import { store, connect, disconnect } from "../../store";

const CodeEditor = () => {
  const [language, setLanguage] = useState("python");
  const [value, setValue] = useState(null);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, []);

  //editor value will be shared with multiple people (YJS text value)
  // when someone deletes will be deleted for everyone
  const editorRef = useRef(null);

  function handleEditorMounted(editor, monaco) {
    editorRef.current = editor;

    //init yjs
    const doc = new Y.Doc(); // collection of shared objects (Text)

    //conect to peers with webRTC
    const provider = new WebrtcProvider("test-room", doc);
    const type = doc.getText("monaco");

    //bind yjs to monaco
    const binding = new MonacoBinding(
      type,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness
    );
  }

  const onSelect = (language) => {
    setLanguage(language);
    // langStore.output.push(result.output);
  };

  return (
    <Box padding={10}>
      <HStack spacing={4}>
        <Box w="50%">
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            height="75vh"
            theme="vs-dark"
            language={language}
            onMount={handleEditorMounted}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Box>
        <Output editorRef={editorRef} language={language} />
      </HStack>
    </Box>
  );
};

export default CodeEditor;
