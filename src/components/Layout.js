import { Outlet } from 'react-router-dom';
import DenseAppBar from './ToolBar';

export const Layout = () => (
  <>
    <DenseAppBar/>
    <Outlet />
  </>
);