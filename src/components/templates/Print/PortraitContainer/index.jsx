import { Box } from "@mui/material";

export default function PortraitContainer({ children }) {
  return (
    <Box
      sx={{
        display: "none",
        p: 2,
        width: "816px",
        height: "1054px",
        "@media print": {
          display: "block",
          p: 2,
          m: 0,
          overflow: "hidden",
          height: "1054px",
          "@page": {
            size: "letter portrait",
          },
        },
      }}
    >
      {children}
    </Box>
  );
}
