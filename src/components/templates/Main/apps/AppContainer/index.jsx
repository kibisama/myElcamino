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

const AppContainer = ({ children }) => {
  const nodeRef = React.useRef(null);
  const { sidebar } = useSelector((s) => s.main);
  const top = (sidebar === "expanded" || sidebar === "mini" ? 33 : 29) / 2;
  const left =
    (sidebar === "expanded"
      ? DRAWER_WIDTH
      : sidebar === "mini"
      ? MINI_DRAWER_WIDTH
      : 0) / 2;
  const topRef = React.useRef(top);
  const leftRef = React.useRef(left);
  const padding = 24;

  const get_bound_bottom_base = React.useCallback(() => {});

  const bound_bottom_base = nodeRef.current
    ? window.innerHeight / 2 + nodeRef.current.clientHeight / 2 - padding
    : null;
  const bound_right_base = nodeRef.current
    ? window.innerWidth / 2 + nodeRef.current.clientWidth / 2 - padding
    : null;

  return (
    <Zoom in timeout={500}>
      <Box
        sx={{
          top: `calc(50% + ${topRef.current}px)`,
          left: `calc(50% + ${leftRef.current}px)`,
          translate: "-50% -50%",
          position: "absolute",
          zIndex: sidebar === "mobile-expanded" ? -1 : null,
        }}
      >
        <Draggable
          bounds={{
            top: bound_bottom_base ? -(bound_bottom_base + top) : null,
            left: bound_right_base ? -(bound_right_base + left) : null,
            bottom: bound_bottom_base ? bound_bottom_base - top : null,
            right: bound_right_base ? bound_right_base - left : null,
          }}
          nodeRef={nodeRef}
        >
          <Container ref={nodeRef}>
            <Titlebar />
            <Box sx={{ p: `${padding}px` }}>{children}</Box>
          </Container>
        </Draggable>
      </Box>
    </Zoom>
  );
};

export default AppContainer;
