import { Route, Routes } from "react-router-dom";
import Main from "./components/templates/Main";
import Pickup from "./components/templates/Pickup";
import Prints from "./components/templates/Print";
import { SWRConfig } from "swr";

function App() {
  return (
    <SWRConfig
      value={{
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
        <Route path="/print/*" element={<Prints />} />
      </Routes>
    </SWRConfig>
  );
}

export default App;
