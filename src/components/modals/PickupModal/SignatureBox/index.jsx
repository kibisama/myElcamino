import React from "react";
import SignatureCanvas from "react-signature-canvas";
import { getCanvas } from "../../../../lib/api/client";

export default function SignatureBox({ socket, open }) {
  const signRef = React.useRef(null);
  const timeout = React.useRef(null);
  React.useEffect(() => {
    function refresh(data) {
      signRef.current.fromDataURL(data);
    }
    async function onConnect() {
      try {
        await getCanvas();
      } catch (e) {
        console.log(e);
      }
    }
    function clear() {
      signRef.current.clear();
    }
    onConnect();
    socket.on("connect", onConnect);
    socket.on("canvas", refresh);
    socket.on("clear-canvas", clear);
    return () => {
      socket.off("connect", onConnect);
      socket.off("canvas", refresh);
      socket.off("clear-canvas", clear);
      clearTimeout(timeout.current);
    };
  }, [open]);
  return (
    <SignatureCanvas
      ref={signRef}
      backgroundColor="rgb(255,255,255)"
      canvasProps={{ width: 500, height: 150 }}
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
  );
}
