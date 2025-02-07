"use client";  // This is a client-side component

import { usePathname } from 'next/navigation';
import FooterBar from './components/Footer/Footer';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Check if the current path is the home page
  const isHomePage = pathname === '/';

  return (
    <div>
      {/* Render the main content */}
      {children}

      {/* Only show the footer on non-home pages */}
      {!isHomePage && <FooterBar />}
    </div>
  );
};

export default ClientLayout;
