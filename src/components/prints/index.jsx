import { Route, Routes } from "react-router-dom";
import DeliveryProof from "./DeliveryProof";

export default function Prints() {
  return (
    <Routes>
      <Route path="/deliveryProof/:_id/:rxNumber" element={<DeliveryProof />} />
    </Routes>
  );
}
