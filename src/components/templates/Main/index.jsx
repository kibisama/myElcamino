import { useSelector } from "react-redux";
import * as pages from "./pages";
import * as apps from "./apps";
import AppTheme from "./shared-theme";
import CssBaseline from "@mui/material/CssBaseline";
import Dashboard from "./Dashboard";

const Main = () => {
  const { app, page } = useSelector((s) => s.main);
  const Page = pages[page] || "div";
  const App = apps[app] || "div";
  return (
    <AppTheme>
      <CssBaseline>
        <Dashboard children={<Page />} />
        {app && <App />}
      </CssBaseline>
    </AppTheme>
  );
};

export default Main;
