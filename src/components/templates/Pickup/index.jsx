import React from "react";
import { Box, Button, Typography, Fade } from "@mui/material";
import ItemsList from "../Main/apps/Pickup/ItemsList";
import SignatureBox from "../Main/apps/Pickup/SignatureBox";
import RelationBox from "../Main/apps/Pickup/RelationBox";
import Clock from "../Main/apps/Pickup/Clock";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import LoadingSvg from "../../svg/Loading";
import VerifiedSvg from "../../svg/Verified";
import WarningSvg from "../../svg/Warning";
import { io } from "socket.io-client";

const URL = process.env.REACT_APP_CLIENT_API_ADDRESS + "/pickup";
let socket;

const Pickup = () => {
  const [canvas, setCanvas] = React.useState(false);
  const [items, setItems] = React.useState(false);
  const [state, setState] = React.useState("standby");
  if (!socket) {
    socket = io(URL);
  }
  const timeout = React.useRef(null);

  React.useEffect(() => {
    function onCanvas(data) {
      if (data) {
        setCanvas(true);
      } else {
        setCanvas(false);
      }
    }
    function onItems(data) {
      if (data?.length > 0) {
        setItems(true);
      } else {
        setItems(false);
      }
    }
    function onState(data) {
      if (data === "success" || data === "error") {
        timeout.current = setTimeout(() => {
          setState("standby");
          socket.emit("refresh");
        }, 5000);
      }
      setState(data);
    }

    socket.on("state", onState);
    socket.on("items", onItems);
    socket.on("canvas", onCanvas);

    return () => {
      socket.off("state", onState);
      socket.off("items", onItems);
      socket.off("canvas", onCanvas);
      clearTimeout(timeout.current);
    };
  }, []);

  const disabled = !items || !canvas;

  return (
    <Box
      sx={{
        position: "absolute",
        zIndex: -1,
        width: 800,
        height: 68,
        background: "linear-gradient(to right, #ffffff, #cfd8dc)",
      }}
    >
      <Box
        sx={{
          boxSizing: "border-box",
          width: 800,
          height: 480,
          p: 1.5,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: 36,
            color: "#00a2a2",
            letterSpacing: 1,
          }}
        >
          El Camino Pharmacy
        </Typography>
        {state === "standby" && (
          <Clock
            sx={{
              top: 72,
              position: "absolute",
              fontWeight: 600,
              fontSize: 18,
              color: "#212121",
              justifySelf: "flex-end",
              letterSpacing: 0,
            }}
          />
        )}
        <Box sx={{ display: "flex" }}>
          {state === "standby" ? (
            <React.Fragment>
              <ItemsList
                socket={socket}
                sx={{ border: "1px solid #9e9e9e" }}
                readOnly
              />
              <Box sx={{ alignSelf: "flex-end" }}>
                <Box
                  sx={{
                    borderTop: "1px solid #9e9e9e",
                    borderBottom: "1px solid #9e9e9e",
                    borderRight: "1px solid #9e9e9e",
                    display: "flex",
                    justifyContent: "center",
                    width: 520,
                  }}
                >
                  <RelationBox
                    socket={socket}
                    row
                    sx={{
                      "&.Mui-checked": {
                        color: "#26a69a",
                      },
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    borderBottom: "1px solid #9e9e9e",
                    borderRight: "1px solid #9e9e9e",
                  }}
                >
                  <SignatureBox
                    socket={socket}
                    onBegin={() => setCanvas(true)}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  alignSelf: "flex-end",
                  borderTop: "1px solid #9e9e9e",
                  borderBottom: "1px solid #9e9e9e",
                  borderRight: "1px solid #9e9e9e",
                }}
              >
                <Button
                  disabled={disabled}
                  sx={{
                    width: 120,
                    height: 85,
                    borderRadius: 0,
                    color: "#ffffff",
                    backgroundColor: "#26a69a",
                    borderBottom: "1px solid #9e9e9e",
                    ":hover": {
                      backgroundColor: "#4db6ac",
                    },
                    "&.Mui-disabled": {
                      backgroundColor: "background.paper",
                    },
                  }}
                  onClick={() =>
                    socket.connected && socket.emit("state", "pre-submit")
                  }
                  children={
                    <Typography
                      sx={{
                        color: "#fafafa",
                        fontWeight: 600,
                        fontSize: 14,
                        ...(disabled ? { color: "#9e9e9e" } : {}),
                      }}
                    >
                      ACCEPT
                    </Typography>
                  }
                  endIcon={
                    <CheckIcon
                      sx={
                        disabled ? { color: "#9e9e9e" } : { color: "#fafafa" }
                      }
                    />
                  }
                />
                <Button
                  sx={{
                    width: 120,
                    height: 85,
                    borderRadius: 0,
                    color: "error.main",
                  }}
                  onClick={() => socket.emit("clear_canvas")}
                  children={
                    <Typography
                      sx={{
                        color: "#212121",
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      CLEAR
                    </Typography>
                  }
                  endIcon={<ClearIcon sx={{ color: "error.main" }} />}
                />
              </Box>
            </React.Fragment>
          ) : (
            <Box
              sx={{
                width: 800,
                height: 412,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {state === "error" ? (
                <React.Fragment>
                  <WarningSvg width="12.5%" />
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: 24,
                      color: "#212121",
                    }}
                  >
                    Error: Please try again!
                  </Typography>
                </React.Fragment>
              ) : state === "success" ? (
                <React.Fragment>
                  <VerifiedSvg
                    stroke1={66.6666}
                    stroke2={50}
                    color1="#00d56b"
                    color2="#424242"
                    width="6.25%"
                  />
                  <Fade in timeout={1500}>
                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: 24,
                        color: "#212121",
                      }}
                    >
                      Thank you!
                    </Typography>
                  </Fade>
                </React.Fragment>
              ) : (
                <LoadingSvg stroke={50} width="6.25%" color="#9e9e9e" />
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Pickup;
