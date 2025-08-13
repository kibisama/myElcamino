import AppTheme from "./shared-theme";
import CssBaseline from "@mui/material/CssBaseline";
import Dashboard from "./Dashboard";
import * as apps from "./apps";
import { useSelector } from "react-redux";

const Main = () => {
  const { app } = useSelector((s) => s.main);
  const App = apps[app] || "div";
  return (
    <AppTheme>
      <CssBaseline>
        <Dashboard />
        {app && <App />}
      </CssBaseline>
    </AppTheme>
  );
};

export default Main;
