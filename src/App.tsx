import { lazy } from 'react';
/** react-router-dom v7 — les CHANGELOG ved minor/major-bump: https://reactrouter.com/changelog */
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppErrorBoundary } from './components/AppErrorBoundary';
import { RouteSeo } from './components/RouteSeo';
import { ScrollToTop } from './components/ScrollToTop';
import SideLayout from './pages/SideLayout';
import HomeOrder from './pages/HomeOrder';
import { MenyPanelRoute } from './pages/MenyPanelRoute';
import { NotFoundPage, NotFoundSidePanel } from './pages/NotFound';
import './App.css';
/** Mørk modus + view transitions — etter App.css så panel-regler ikke overskriver tema */
import './styles/app-theme-grain-vt.css';

const OmOssPanel = lazy(() => import('./pages/panels/OmOssPanel'));
const KalenderPanel = lazy(() => import('./pages/panels/KalenderPanel'));
const BestillPanel = lazy(() => import('./pages/panels/BestillPanel'));
const KontaktPanel = lazy(() => import('./pages/panels/KontaktPanel'));

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteSeo />
      <AppErrorBoundary>
        <Routes>
          <Route path="/" element={<HomeOrder />} />
          <Route path="/side" element={<SideLayout />}>
            <Route index element={<Navigate to="om-oss" replace />} />
            <Route path="om-oss" element={<OmOssPanel />} />
            <Route path="historie" element={<Navigate to="/side/om-oss" replace />} />
            <Route path="meny" element={<MenyPanelRoute />} />
            <Route path="priser" element={<Navigate to="/side/meny#priser" replace />} />
            <Route path="kalender" element={<KalenderPanel />} />
            <Route path="bestill" element={<BestillPanel />} />
            <Route path="kontakt" element={<KontaktPanel />} />
            <Route path="*" element={<NotFoundSidePanel />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AppErrorBoundary>
    </BrowserRouter>
  );
}
