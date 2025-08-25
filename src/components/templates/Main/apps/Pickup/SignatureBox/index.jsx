import { Box } from "@mui/material";
import React from "react";
import SignatureCanvas from "react-signature-canvas";

export default function SignatureBox({ socket, onBegin }) {
  const signRef = React.useRef(null);
  const timeout = React.useRef(null);
  React.useEffect(() => {
    function refresh(data) {
      if (data) {
        signRef.current.fromDataURL(data);
      } else {
        signRef.current.clear();
      }
    }
    socket.on("canvas", refresh);
    return () => {
      socket.off("canvas", refresh);
      clearTimeout(timeout.current);
    };
  }, [socket]);
  return (
    <Box
      sx={{
        width: 520,
        height: 170,
        backgroundColor: "#bdbdbd",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SignatureCanvas
        ref={signRef}
        backgroundColor="rgb(255,255,255)"
        canvasProps={{ width: 500, height: 150 }}
        onBegin={() => {
          onBegin && onBegin();
          function update() {
            socket.emit("canvas", signRef.current.toDataURL());
            timeout.current = setTimeout(update, 500);
          }
          timeout.current = setTimeout(update, 500);
        }}
        onEnd={() => {
          clearTimeout(timeout.current);
          socket.emit("canvas", signRef.current.toDataURL());
        }}
      />
    </Box>
  );
}
