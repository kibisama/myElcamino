import React from "react";
import SignatureCanvas from "react-signature-canvas";
import { Box } from "@mui/material";
import { getCanvas } from "../../../../lib/api/client";

export default function SignatureBox({ socket }) {
  const signRef = React.useRef(null);
  const timeout = React.useRef(null);
  React.useEffect(() => {
    function refresh(data) {
      signRef.current.fromDataURL(data);
    }
    socket.on("connect", async () => {
      try {
        await getCanvas();
      } catch (e) {
        console.log(e);
      }
    });
    socket.on("canvas", refresh);
    return () => {
      socket.off("canvas", refresh);
      clearTimeout(timeout.current);
    };
  }, []);
  return (
    <Box
      sx={{
        width: 400,
        height: 200,
        outline: "1px solid",
        borderRadius: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <SignatureCanvas
          ref={signRef}
          backgroundColor="rgb(255,255,255)"
          canvasProps={{ width: 380, height: 180 }}
          onBegin={() => {
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
    </Box>
  );
}
