import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { darkTheme, lightTheme } from "./lib/mui/theme";
import CssBaseline from "@mui/material/CssBaseline";
import Main from "./components/templates/Main";

function App() {
  const { darkMode } = useSelector((state) => state.global);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline>
        <Main />
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;
