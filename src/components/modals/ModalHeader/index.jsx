import React from "react";
import { Box, Typography, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontSize: "h5.fontSize",
    mt: 2,
    ml: 4,
  },
};

const StyledCloseIcon = styled(CloseIcon)(({ theme }) => ({
  cursor: "pointer",
  color: theme.palette.grey[500],
  ":hover": {
    color: theme.palette.primary.main,
  },
  fontSize: 36,
}));

const ModalHeader = ({ title, handleClose }) => {
  return (
    <Box style={style.container}>
      <StyledCloseIcon onClick={handleClose} />
      {title && <Typography sx={style.title}>{title}</Typography>}
    </Box>
  );
};

export default ModalHeader;
