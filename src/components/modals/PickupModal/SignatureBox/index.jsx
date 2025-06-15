import React from "react";
import SignatureCanvas from "react-signature-canvas";
import { getPickupData } from "../../../../lib/api/client";

export default function SignatureBox({ socket, open, onBegin }) {
  const signRef = React.useRef(null);
  const timeout = React.useRef(null);
  React.useEffect(() => {
    function refresh(data) {
      if (data) {
        signRef.current.fromDataURL(data);
      }
    }
    function clear() {
      signRef.current.clear();
    }
    (async function () {
      try {
        await getPickupData("canvas");
      } catch (e) {
        console.log(e);
      }
    })();
    socket.on("canvas", refresh);
    socket.on("clear-canvas", clear);
    return () => {
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
  );
}
