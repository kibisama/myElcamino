import { CircularProgress, styled } from "@mui/material";

export default styled(CircularProgress)(({ theme }) => ({
  color:
    theme.palette.mode === "dark"
      ? theme.palette.grey[700]
      : theme.palette.grey[300],
}));
