import AppTheme from "./shared-theme";
import CssBaseline from "@mui/material/CssBaseline";
import Dashboard from "./Dashboard";
import * as apps from "./apps";
import { useSelector } from "react-redux";
import { SnackbarProvider } from "notistack";
import useDocumentTitle from "../../../hooks/useDocumentTitle";
import { SWRConfig } from "swr";
import { enqueueSnackbar } from "notistack";

const Main = () => {
  useDocumentTitle();
  const { app } = useSelector((s) => s.main);
  const App = apps[app] || "div";
  return (
    <AppTheme>
      <CssBaseline>
        <SnackbarProvider>
          <SWRConfig
            value={{
              onError: (error) => {
                if (error.status === 404) {
                  return;
                }
                enqueueSnackbar(error.response?.data.message || error.message, {
                  variant: "error",
                });
              },
              onErrorRetry: (
                error,
                key,
                config,
                revalidate,
                revalidateOpts
              ) => {
                if (error.status === 404) {
                  return;
                }
              },
            }}
          >
            <Dashboard />
            {app && <App id={app} />}
          </SWRConfig>
        </SnackbarProvider>
      </CssBaseline>
    </AppTheme>
  );
};

export default Main;
