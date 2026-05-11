import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SideLayout from './pages/SideLayout';
import HomeOrder from './pages/HomeOrder';
import {
  OmOssPanel,
  MenyPanel,
  KalenderPanel,
  BestillPanel,
  KontaktPanel,
} from './pages/sidePanels';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeOrder />} />
        <Route path="/side" element={<SideLayout />}>
          <Route index element={<Navigate to="om-oss" replace />} />
          <Route path="om-oss" element={<OmOssPanel />} />
          <Route path="historie" element={<Navigate to="/side/om-oss" replace />} />
          <Route path="meny" element={<MenyPanel />} />
          <Route path="kalender" element={<KalenderPanel />} />
          <Route path="bestill" element={<BestillPanel />} />
          <Route path="kontakt" element={<KontaktPanel />} />
          <Route path="*" element={<Navigate to="/side/om-oss" replace />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
