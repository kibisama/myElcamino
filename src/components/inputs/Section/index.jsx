import { Box, Typography, useTheme, useColorScheme } from "@mui/material";

export default function Section({ title, subtitle, Input }) {
  const theme = useTheme();
  const { systemMode, mode } = useColorScheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        borderBottom: 1,
        borderColor:
          mode === "dark" || systemMode === "dark"
            ? (theme.vars || theme).palette.grey[800]
            : (theme.vars || theme).palette.grey[100],
        py: 2,
      }}
    >
      <Box sx={{ width: "45%" }}>
        <Typography sx={{ fontSize: 13 }}>{title}</Typography>
        {subtitle && (
          <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      <Box sx={{ width: "45%" }}>{Input}</Box>
    </Box>
  );
}
