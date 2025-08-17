import React from 'react';
import Image from 'next/image';
import { AppHeader, AppFooter } from '../components/layout';

const MenuPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/background.jpg"
          alt=""
          fill
          className="object-cover"
          priority
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <AppHeader />
        
        <main className="flex-1 flex items-center justify-center">
          {/* Future menu buttons will go here */}
        </main>
        
        <AppFooter />
      </div>
    </div>
  );
};

export default MenuPage;