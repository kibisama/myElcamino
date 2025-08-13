import { Box, Zoom, styled } from "@mui/material";

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

const ModalBox = ({ children, ...props }) => {
  return (
    <Zoom in timeout={500}>
      <StyledBox {...props}>{children}</StyledBox>
    </Zoom>
  );
};

export default ModalBox;
