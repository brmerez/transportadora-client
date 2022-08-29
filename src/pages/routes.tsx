import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ListParcels from "./ListParcels";
import ParcelView from "./ParcelView";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="all" element={<ListParcels />} />
        <Route path=":codRastreio" element={<ParcelView />} />
      </Routes>
    </BrowserRouter>
  );
}
