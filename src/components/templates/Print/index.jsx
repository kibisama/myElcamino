import { Route, Routes } from "react-router-dom";
import PickupReport from "./PickupReport";

export default function Prints() {
  return (
    <Routes>
      <Route path="/pickups/:_id/:rxNumber" element={<PickupReport />} />
    </Routes>
  );
}
