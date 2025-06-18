import React from "react";
import { Box, Button, styled, Typography } from "@mui/material";
import ItemsList from "../../modals/PickupModal/ItemsList";
import SignatureBox from "../../modals/PickupModal/SignatureBox";
import RelationBox from "../../modals/PickupModal/RelationBox";
import Clock from "../../modals/PickupModal/Clock";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import LoadingSvg from "../../../svg/Loading";
import VerifiedSvg from "../../../svg/Verified";
import WarningSvg from "../../../svg/Warning";
import {
  getPickupData,
  clearPickupCanvas,
  preSubmitPickup,
} from "../../../lib/api/client";
import { io } from "socket.io-client";

const URL = process.env.REACT_APP_CLIENT_API_ADDRESS + "/pickup";
let socket;

const StyledButton = styled(({ ...props }) => <Button {...props} />)(
  ({ theme }) => ({
    width: 120,
    height: 90,
    borderRadius: 0,
  })
);

const style = {
  container: {
    boxSizing: "border-box",
    width: 800,
    height: 480,
    p: 1.5,
    display: "flex",
  },
  background: {
    position: "absolute",
    zIndex: -1,
    width: 800,
    height: 68,
    background: "linear-gradient(to right, #ffffff, #cfd8dc)",
  },
  logo: {
    fontWeight: 800,
    fontSize: 36,
    color: "#009688",
    justifySelf: "flex-end",
    letterSpacing: 1,
    mb: 1,
  },
  clock: {
    fontWeight: 600,
    fontSize: 18,
    color: "#212121",
    justifySelf: "flex-end",
    letterSpacing: 0,
  },
  signatureBox: {
    width: 600,
    height: 170,
    borderRight: "1px solid",
    borderColor: "#9e9e9e",
    backgroundColor: "#bdbdbd",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  relationBox: {
    borderTop: "1px solid #9e9e9e",
    borderRight: "1px solid #9e9e9e",
    display: "flex",
    justifyContent: "center",
    width: 519,
  },
};

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
      if (data === "submit" || data === "error") {
        timeout.current = setTimeout(() => {
          setState("standby");
        }, 5000);
      }
      setState(data);
    }
    function onClear() {
      setCanvas(false);
    }
    (async function () {
      try {
        await getPickupData("state");
        await getPickupData("items");
        await getPickupData("canvas");
        await getPickupData("relation");
      } catch (e) {
        console.log(e);
      }
    })();
    socket.on("state", onState);
    socket.on("items", onItems);
    socket.on("canvas", onCanvas);
    socket.on("clear-canvas", onClear);

    return () => {
      socket.off("state", onState);
      socket.off("items", onItems);
      socket.off("canvas", onCanvas);
      socket.off("clear-canvas", onClear);
      clearTimeout(timeout.current);
    };
  }, []);

  const disabled = !items || !canvas;

  return (
    <>
      {state === "error" ? (
        <Box
          sx={{
            ...style.container,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <WarningSvg width="12.5%" />
          <Typography sx={{ fontWeight: 600, fontSize: 24, color: "#212121" }}>
            Error: Please try again!
          </Typography>
        </Box>
      ) : state === "submit" ? (
        <Box
          sx={{
            ...style.container,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <VerifiedSvg
            stroke1={50}
            stroke2={33.3333}
            color1="#00c853"
            color2="#424242"
            width="6.25%"
          />
          <Typography sx={{ fontWeight: 600, fontSize: 24, color: "#212121" }}>
            Thank you!
          </Typography>
        </Box>
      ) : state === "pre-submit" ? (
        <Box
          sx={{
            ...style.container,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <LoadingSvg stroke={50} width="6.25%" color="#9e9e9e" />
        </Box>
      ) : (
        <div>
          <Box sx={style.background} />
          <Box sx={style.container}>
            <Box sx={{ alignSelf: "flex-end" }}>
              <ItemsList
                socket={socket}
                sx={{
                  border: "1px solid",
                  borderColor: "#9e9e9e",
                }}
                readOnly
              />
            </Box>
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography sx={style.logo}>El Camino Pharmacy</Typography>
                <Clock sx={style.clock} />
              </Box>
              <Box>
                <Box sx={style.relationBox}>
                  <RelationBox socket={socket} row />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    width: 640,
                    borderTop: "1px solid",
                    borderRight: "1px solid",
                    borderBottom: "1px solid",
                    borderColor: "#9e9e9e",
                    height: 170,
                  }}
                >
                  <Box sx={style.signatureBox}>
                    <SignatureBox
                      socket={socket}
                      onBegin={() => {
                        setCanvas(true);
                      }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <StyledButton
                      disabled={disabled}
                      sx={{
                        color: "#ffffff",
                        backgroundColor: "#26a69a",
                        borderBottom: "1px solid",
                        borderColor: "#9e9e9e",
                        ":hover": {
                          backgroundColor: "#4db6ac",
                        },
                        "&.Mui-disabled": {
                          backgroundColor: "background.paper",
                        },
                      }}
                      onClick={async () => {
                        try {
                          await preSubmitPickup();
                        } catch (e) {
                          console.log(e);
                        }
                      }}
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
                            disabled
                              ? { color: "#9e9e9e" }
                              : { color: "#fafafa" }
                          }
                        />
                      }
                    />
                    <StyledButton
                      sx={{ color: "error.main" }}
                      onClick={async () => {
                        try {
                          await clearPickupCanvas();
                        } catch (e) {
                          console.log(e);
                        }
                      }}
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
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
      )}
    </>
  );
};

export default Pickup;
