import React from "react";
import { Box, Paper, Zoom, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { setApp } from "../../../../../reduxjs@toolkit/mainSlice";
import { useDispatch } from "react-redux";
import Draggable from "react-draggable";

const StyledCloseIcon = styled(CloseIcon)(({ theme }) => ({
  cursor: "pointer",
  // color: theme.palette.grey[500],
  // ":hover": {
  //   color: theme.palette.primary.main,
  // },
  // fontSize: 36,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  border: "1px solid transparent",
  borderRadius: 10,
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
  const dispatch = useDispatch();
  const nodeRef = React.useRef(null);
  return (
    <Zoom in timeout={500}>
      <div>
        <Draggable nodeRef={nodeRef}>
          <StyledBox ref={nodeRef} sx={{ width: 400, height: 400 }} {...props}>
            <StyledCloseIcon
              onClick={() => {
                dispatch(setApp(""));
              }}
            />
            <Box>{children}</Box>
          </StyledBox>
        </Draggable>
      </div>
    </Zoom>
  );
};

export default AppContainer;

// import React from "react";
// import { Box, Typography, styled } from "@mui/material";

// const style = {
//   container: {
//     width: "100%",
//     display: "flex",
//     flexDirection: "row-reverse",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//   },
//   title: {
//     fontSize: "h5.fontSize",
//     mt: 2,
//     ml: 4,
//   },
// };

// const ModalHeader = ({ title, handleClose }) => {
//   return (
//     <Box style={style.container}>
//       <StyledCloseIcon onClick={handleClose} />
//       {title && <Typography sx={style.title}>{title}</Typography>}
//     </Box>
//   );
// };

// export default ModalHeader;
