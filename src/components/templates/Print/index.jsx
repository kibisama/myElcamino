import { Route, Routes } from "react-router-dom";
import PickupReport from "./PickupReport";
import DeliveryReceipt from "./DeliveryReceipt";

export default function Prints() {
  return (
    <Routes>
      <Route path="/pickups/:_id/:rxNumber" element={<PickupReport />} />
      <Route
        path="/deliveries/:section/:date/:session"
        element={<DeliveryReceipt />}
      />
    </Routes>
  );
}
