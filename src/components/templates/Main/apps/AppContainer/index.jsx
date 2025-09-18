import React from "react";
import Draggable from "react-draggable";
import { Box, Zoom, styled, useColorScheme, useTheme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { setActiveApp, setApp } from "../../../../../reduxjs@toolkit/mainSlice";
import { useDispatch, useSelector } from "react-redux";
import { DRAWER_WIDTH, MINI_DRAWER_WIDTH } from "../../constants";
import useWindowSize from "../../../../../hooks/useWindowSize";

const CloseButton = styled(CloseIcon)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.grey[400],
  ":hover": {
    color: theme.palette.primary.main,
  },
}));

const Titlebar = ({ id }) => {
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
        className="app-content"
        sx={{
          width: 32,
          height: "inherit",
          pr: 1,
        }}
        onClick={() => {
          dispatch(setApp(id));
        }}
      />
    </Box>
  );
};

const AppContainer = ({ id, children }) => {
  if (!id) {
    throw new Error("You are rending AppContainer without an id prop.");
  }
  const theme = useTheme();
  const { mode, systemMode } = useColorScheme();
  const palette = (theme.vars || theme).palette;
  const isDarkMode = mode === "dark" || systemMode === "dark";
  const { activeApp } = useSelector((s) => s.main);
  const dispatch = useDispatch();
  const handleAppClick = React.useCallback(() => {
    dispatch(setActiveApp(id));
  }, [dispatch, id]);
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
  const [windowHeight, windowWidth] = useWindowSize();
  const [bx, setBx] = React.useState(null);
  const [by, setBy] = React.useState(null);
  const padding = 24;
  React.useEffect(() => {
    setBx(
      nodeRef.current
        ? windowWidth / 2 + nodeRef.current.clientWidth / 2 - padding
        : null
    );
    setBy(
      nodeRef.current
        ? windowHeight / 2 + nodeRef.current.clientHeight / 2 - padding
        : null
    );
  }, [windowHeight, windowWidth]);

  return (
    <Zoom in timeout={500}>
      <Box
        sx={{
          top: `calc(50% + ${topRef.current}px)`,
          left: `calc(50% + ${leftRef.current}px)`,
          translate: "-50% -50%",
          position: "fixed",
          zIndex: sidebar === "mobile-expanded" ? -1 : null,
        }}
        onClick={activeApp !== id ? handleAppClick : undefined}
      >
        <Draggable
          bounds={{
            top: by ? -(by + topRef.current) : by,
            left: bx ? -(bx + leftRef.current) : bx,
            bottom: by ? by - topRef.current : by,
            right: bx ? bx - leftRef.current : bx,
          }}
          cancel=".app-content"
          nodeRef={nodeRef}
        >
          <Box
            sx={{
              cursor: "grab",
              border: "1px solid",
              borderRadius: 1,
              backgroundColor: (theme.vars || theme).palette.background.paper,
              ":hover": {
                borderColor:
                  activeApp === id
                    ? isDarkMode
                      ? palette.grey[100]
                      : palette.grey[900]
                    : isDarkMode
                    ? palette.grey[400]
                    : palette.grey[600],
              },
              borderColor:
                activeApp === id
                  ? isDarkMode
                    ? palette.grey[100]
                    : palette.grey[900]
                  : palette.divider,
            }}
            ref={nodeRef}
          >
            <Titlebar id={id} />
            <Box sx={{ p: `${padding}px` }}>
              <Box sx={{ cursor: "default" }} className="app-content">
                {children}
              </Box>
            </Box>
          </Box>
        </Draggable>
      </Box>
    </Zoom>
  );
};

export default AppContainer;
