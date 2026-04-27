import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTE_PATHS } from '../config/appConstants';
import AlbumsPage from '../modules/albums/AlbumsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTE_PATHS.root} element={<Navigate to={ROUTE_PATHS.albums} replace />} />
      <Route path={ROUTE_PATHS.albums} element={<AlbumsPage />} />
    </Routes>
  );
};

export default AppRoutes;
