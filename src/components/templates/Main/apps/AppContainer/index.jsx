import React from "react";
import Draggable from "react-draggable";
import { Box, Zoom, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { setApp } from "../../../../../reduxjs@toolkit/mainSlice";
import { useDispatch, useSelector } from "react-redux";
import { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from "../../constants";

const CloseButton = styled(CloseIcon)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.grey[400],
  ":hover": {
    color: theme.palette.primary.main,
  },
}));

const Titlebar = () => {
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        height: 32,
        mb: 1,
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
      }}
    >
      <CloseButton
        sx={{
          width: 32,
          height: "inherit",
          pr: 1,
        }}
        onClick={() => {
          dispatch(setApp(""));
        }}
      />
    </Box>
  );
};

const Container = styled("div")(({ theme }) => ({
  //
  width: 400,
  height: 400,

  cursor: "grab",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  borderRadius: 8,
  backgroundColor: (theme.vars || theme).palette.background.paper,
  ":hover": {
    borderColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[400]
        : theme.palette.grey[600],
  },
  // ":focus": {
  //   borderColor:
  //     theme.palette.mode === "dark"
  //       ? theme.palette.grey[100]
  //       : theme.palette.grey[900],
  // },
}));

const AppContainer = ({ children, ...props }) => {
  const nodeRef = React.useRef(null);
  const { sidebar } = useSelector((s) => s.main);
  const leftRef = React.useRef(
    `calc(50% + ${
      (sidebar === "expanded"
        ? DRAWER_WIDTH
        : sidebar === "mini"
        ? MINI_DRAWER_WIDTH
        : 0) / 2
    }px)`
  );

  console.log(nodeRef.current?.clientHeight);
  return (
    <Zoom in timeout={500}>
      <Box
        sx={{
          top: "calc(50% + 33px)",
          left: leftRef.current,
          translate: "-50% -50%",
          position: "absolute",
          zIndex: sidebar === "mobile-expanded" ? -1 : null,
        }}
      >
        <Draggable bounds={{ top: -window.innerHeight / 2 }} nodeRef={nodeRef}>
          <Container ref={nodeRef}>
            <Titlebar />
            <Box {...props}>{children}</Box>
          </Container>
        </Draggable>
      </Box>
    </Zoom>
  );
};

export default AppContainer;
