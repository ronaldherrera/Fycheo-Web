
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-background-dark text-white font-display flex flex-col">
      <Navbar />
      <main className="flex-1 relative">
         <Outlet />
      </main>
      <Footer />
    </div>
  );
};
