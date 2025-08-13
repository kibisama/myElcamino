import { useSelector } from "react-redux";
import * as pages from "./pages";
import AppTheme from "./shared-theme";
import CssBaseline from "@mui/material/CssBaseline";
import Dashboard from "./Dashboard";

const Main = () => {
  const { page } = useSelector((s) => s.main);
  const Page = pages[page] || "div";
  return (
    <AppTheme>
      <CssBaseline>
        <Dashboard children={<Page />} />
      </CssBaseline>
    </AppTheme>
  );
};

export default Main;
