import { Box, styled } from "@mui/material";

export default styled(({ ...props }) => <Box {...props} />)(({ theme }) => ({
  outline: "1px solid",
  outlineColor: theme.palette.divider,
  borderRadius: 8,
  ":hover": {
    outline: "2px solid",
    cursor: "pointer",
    outlineColor:
      theme.palette.mode === "dark"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
  },
}));
