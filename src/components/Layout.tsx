import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
}