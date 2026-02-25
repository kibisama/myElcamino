import { Route, Routes } from "react-router-dom";
import Main from "./components/templates/Main";
import Pickup from "./components/templates/Pickup";
import { SWRConfig } from "swr";
import { enqueueSnackbar } from "notistack";

function App() {
  return (
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
        onErrorRetry: (error, key, config, revalidate, revalidateOpts) => {
          if (error.status === 404) {
            return;
          }
        },
      }}
    >
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/pickup" element={<Pickup />} />
      </Routes>
    </SWRConfig>
  );
}

export default App;
