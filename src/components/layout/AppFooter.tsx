import React from 'react';
import Image from 'next/image';

interface AppFooterProps {
  copyrightText?: string;
  className?: string;
}

const AppFooter: React.FC<AppFooterProps> = ({
  copyrightText = "© Copyright Stramit Corporation Pty Ltd October 2018",
  className = "",
}) => {
  return (
    <footer className={`border-t border-gray-200 bg-white/90 backdrop-blur-sm py-4 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="text-black text-sm">
          {copyrightText}
        </div>
        <div className="flex-shrink-0">
          <Image
            src="/images/stramit-logo.jpg"
            alt="Stramit Corporation logo"
            width={120}
            height={60}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;