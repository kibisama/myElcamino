import React from "react";
import Draggable from "react-draggable";
import { Box, Zoom, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { setApp } from "../../../../../reduxjs@toolkit/mainSlice";
import { useDispatch } from "react-redux";
import { DashboardSidebarContext } from "../../context";
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
      className="titlebar"
      sx={{
        height: 32,
        mb: 1,
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
        cursor: "grab",
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
  border: "1px solid",
  borderColor: theme.palette.divider,
  borderRadius: 8,
  backgroundColor: theme.palette.background.paper,
  ":hover": {
    borderColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[400]
        : theme.palette.grey[600],
  },
  ":focus": {
    borderColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
  },
}));

const AppContainer = ({ children, ...props }) => {
  const nodeRef = React.useRef(null);
  const sidebarContext = React.useContext(DashboardSidebarContext);
  if (!sidebarContext) {
    throw new Error("Sidebar context was used without a provider.");
  }
  const { fullyExpanded = true } = sidebarContext;
  const leftRef = React.useRef(
    `calc(50% + ${(fullyExpanded ? DRAWER_WIDTH : MINI_DRAWER_WIDTH) / 2}px)`
  );
  return (
    <Zoom in timeout={500}>
      <Box
        sx={{
          top: "calc(50% + 32px)",
          left: leftRef.current,
          translate: "-50% -50%",
          position: "absolute",
        }}
      >
        <Draggable nodeRef={nodeRef} handle=".titlebar">
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
