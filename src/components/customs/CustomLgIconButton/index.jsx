import { Box, Typography, useTheme } from "@mui/material";

const CustomLgIconButton = ({ sx, icon, label, onClick }) => {
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        width: 80,
        height: 80,
        m: 0.5,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.25rem",
        border: "1px solid transparent",
        borderRadius: 1,
        color: palette.secondary.main,
        ":hover": {
          cursor: "pointer",
          backgroundColor:
            palette.mode === "dark" ? palette.grey[800] : palette.grey[300],
        },
        ...sx,
      }}
      onClick={onClick}
    >
      {icon}
      <Typography sx={{ fontSize: 9, fontWeight: 600 }}>{label}</Typography>
    </Box>
  );
};

export default CustomLgIconButton;
