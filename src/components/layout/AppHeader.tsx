import React from 'react';

interface AppHeaderProps {
  title?: string;
  version?: string;
  tagline?: string;
  className?: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  title = "EX-facta™ design software",
  version = "Version 1.5.3",
  tagline = "exclusively for Stramit Exacta® purlins and Stramit® Bridging",
  className = "",
}) => {
  return (
    <header className={`bg-brand-peach py-6 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-black text-2xl md:text-3xl font-bold mb-2">
          {title}
        </h1>
        <p className="text-black text-lg md:text-xl mb-1">
          {version}
        </p>
        <p className="text-black text-sm md:text-base">
          {tagline}
        </p>
      </div>
    </header>
  );
};

export default AppHeader;