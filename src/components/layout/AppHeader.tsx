import React from 'react';
import Image from 'next/image';

interface AppHeaderProps {
  className?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  className = "",
}) => {
  return (
    <header className={`${className}`}>
      {/* Row 1: White background with logo and text */}
      <div className="bg-white py-2 md:py-3 px-4 overflow-hidden">
        <div className="flex items-center">
          <Image
            src="/images/EX-facta-logo.png"
            alt="EX-facta logo"
            width={48}
            height={48}
            className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain flex-shrink-0"
            priority
          />
          <span className="ml-3 text-brand-red text-sm sm:text-base md:text-lg lg:text-xl font-bold whitespace-nowrap">
            EX-facta™
          </span>
        </div>
      </div>
      
      {/* Row 2: Banner image */}
      <div className="relative w-full overflow-hidden" style={{ height: 'clamp(48px, 8vw, 96px)' }}>
        <Image
          src="/images/EX-facta-banner.png"
          alt=""
          fill
          className="object-cover object-left"
          sizes="100vw"
          priority
          aria-hidden="true"
        />
      </div>
    </header>
  );
};

export default AppHeader;