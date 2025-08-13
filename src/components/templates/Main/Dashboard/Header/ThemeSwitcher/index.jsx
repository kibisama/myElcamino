import * as React from "react";
import {
  useMediaQuery,
  IconButton,
  Tooltip,
  useTheme,
  useColorScheme,
} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export default function ThemeSwitcher() {
  const theme = useTheme();

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const preferredMode = prefersDarkMode ? "dark" : "light";

  const { mode, setMode } = useColorScheme();

  const paletteMode = !mode || mode === "system" ? preferredMode : mode;

  const toggleMode = React.useCallback(() => {
    setMode(paletteMode === "dark" ? "light" : "dark");
  }, [setMode, paletteMode]);

  return (
    <Tooltip
      title={`${paletteMode === "dark" ? "Light" : "Dark"} mode`}
      enterDelay={1000}
    >
      <div>
        <IconButton
          size="small"
          aria-label={`Switch to ${
            paletteMode === "dark" ? "light" : "dark"
          } mode`}
          onClick={toggleMode}
        >
          {theme.getColorSchemeSelector ? (
            <React.Fragment>
              <LightModeIcon
                sx={{
                  display: "inline",
                  [theme.getColorSchemeSelector("dark")]: {
                    display: "none",
                  },
                }}
              />
              <DarkModeIcon
                sx={{
                  display: "none",
                  [theme.getColorSchemeSelector("dark")]: {
                    display: "inline",
                  },
                }}
              />
            </React.Fragment>
          ) : null}
        </IconButton>
      </div>
    </Tooltip>
  );
}
