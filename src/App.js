import { Route, Routes } from "react-router-dom";
import Main from "./components/templates/Main";
import Pickup from "./components/templates/Pickup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/pickup" element={<Pickup />} />
    </Routes>
  );
}

export default App;
