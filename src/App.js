import { Route, Routes } from "react-router-dom";
import Main from "./components/templates/Main";
import Pickup from "./components/templates/Pickup";
import Prints from "./components/prints";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/pickup" element={<Pickup />} />
      <Route path="/print/*" element={<Prints />} />
    </Routes>
  );
}

export default App;
