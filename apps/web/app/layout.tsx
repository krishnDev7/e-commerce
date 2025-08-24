import './globals.css';
import { ReactNode } from 'react';
import { Providers } from './providers';
import AppNavigation from './navigation';
import Footer from './footer';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppNavigation />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
