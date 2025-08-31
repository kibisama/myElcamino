import AppTheme from "./shared-theme";
import CssBaseline from "@mui/material/CssBaseline";
import Dashboard from "./Dashboard";
import * as apps from "./apps";
import { useSelector } from "react-redux";
import { SnackbarProvider } from "notistack";

const Main = () => {
  const { app } = useSelector((s) => s.main);
  const App = apps[app] || "div";
  return (
    <AppTheme>
      <CssBaseline>
        <SnackbarProvider>
          <Dashboard />
          {app && <App />}
        </SnackbarProvider>
      </CssBaseline>
    </AppTheme>
  );
};

export default Main;
