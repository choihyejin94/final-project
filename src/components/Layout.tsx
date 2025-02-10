import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div>
      <Header />
      <main className="max-w-6xl m-auto w-full mt-10">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}