import { Route, Routes } from "react-router-dom";
import DeliveryProof from "./DeliveryProof";

export default function Prints() {
  return (
    <Routes>
      <Route path="/pickups/:_id/:rxNumber" element={<DeliveryProof />} />
    </Routes>
  );
}
