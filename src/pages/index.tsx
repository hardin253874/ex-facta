import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { AppHeader } from '../components/layout';

const Home: React.FC = () => {
  const [disclaimerText, setDisclaimerText] = useState(
    `This software is provided "as is" for engineering design assistance purposes only. While every effort has been made to ensure the accuracy and reliability of the calculations and recommendations provided by this software, users are advised that:

1. All design calculations and structural recommendations must be verified by a qualified structural engineer before implementation.

2. The software is intended as a design aid only and does not replace professional engineering judgment or compliance with applicable building codes and standards.

3. Stramit Corporation Pty Ltd makes no warranties, express or implied, regarding the accuracy, completeness, or fitness for any particular purpose of the software or its results.

4. Users assume full responsibility for the proper application of all design outputs and must ensure compliance with local building codes, regulations, and engineering standards.

5. Stramit Corporation Pty Ltd shall not be liable for any damages, losses, or claims arising from the use of this software or reliance on its outputs.

6. It is the user's responsibility to verify all material specifications, load calculations, and design parameters before proceeding with any construction or fabrication.

By using this software, you acknowledge that you have read, understood, and agree to these terms and conditions. If you do not agree with these terms, please do not use this software.`
  );

  const [exitMessage, setExitMessage] = useState('');

  const handleExit = () => {
    try {
      // Attempt to close the window/tab
      window.close();
      
      // If the close was blocked (common in modern browsers), provide fallback
      setTimeout(() => {
        if (!window.closed) {
          setExitMessage('Please close this tab manually or use your browser\'s close button.');
          // Optional: navigate to about:blank after showing message
          setTimeout(() => {
            window.location.href = 'about:blank';
          }, 3000);
        }
      }, 100);
    } catch (error) {
      // Fallback if window.close() throws an error
      setExitMessage('Please close this tab manually or use your browser\'s close button.');
      setTimeout(() => {
        window.location.href = 'about:blank';
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Head>
        <title>Ex-Facta - Engineering Design Software</title>
        <meta
          name="description"
          content="Professional engineering design software for Stramit Exacta® purlins and structural components"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/background.png"
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
        
        <main className="relative z-10 w-full py-8">
          <div className="w-full px-4 md:px-6 lg:px-8">
            {/* Two-column layout with 40/60 content split */}
            <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-6 lg:gap-8 items-start">
              {/* Left Column - Hero, Disclaimer, Copyright (40% width on large screens) */}
              <div className="min-w-0 flex flex-col">
                {/* Hero Banner - Sized for 40% column */}
                <div className="relative w-full overflow-hidden h-[clamp(120px,20vw,300px)] rounded-xl">
                  <Image
                    src="/images/EX-facta-hero-banner.png"
                    alt=""
                    fill
                    className="object-contain object-left"
                    priority
                    aria-hidden="true"
                  />
                </div>

                {/* Content Wrapper - grows to push copyright to bottom */}
                <div className="flex-1 min-w-0 space-y-4 md:space-y-6">
                  {/* Disclaimer Panel */}
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Title Bar - White background */}
                    <div className="bg-white px-4 py-3 border-b border-gray-200 rounded-t-lg shadow-sm">
                      <label 
                        htmlFor="disclaimer-text" 
                        className="text-lg font-bold text-black"
                      >
                        Disclaimer:
                      </label>
                    </div>
                    
                    {/* Disclaimer Content - Minimal padding */}
                    <div className="p-0">
                      <textarea
                        id="disclaimer-text"
                        value={disclaimerText}
                        onChange={(e) => setDisclaimerText(e.target.value)}
                        className="w-full h-[clamp(280px,34vh,440px)] p-4 border-0 resize-none focus:ring-2 focus:ring-brand-peach focus:outline-none text-sm leading-relaxed scrollbar-wide overflow-auto"
                        placeholder="Disclaimer text will appear here..."
                      />
                    </div>
                  </div>
                </div>

                {/* Copyright Line - Pinned to bottom */}
                <p className="mt-2 text-xs text-gray-500">
                  © Copyright Stramit Corporation Pty Ltd August 2025
                </p>
              </div>

              {/* Right Column - Action Buttons (60% width on large screens) */}
              <div className="min-w-0 flex flex-col justify-between min-h-full">
                {/* Empty spacer div for top */}
                <div></div>
                
                {/* Button group - bottom-left on desktop, left-aligned on mobile */}
                <div className="mt-auto mb-8 ml-0 lg:ml-6 flex flex-col space-y-4 self-start">
                  <Link 
                    href="/menu" 
                    className="inline-flex items-center justify-center font-bold px-10 py-3 text-white bg-brand-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 shadow-md rounded-tr-lg rounded-bl-lg rounded-tl-none rounded-br-none transition-all duration-200"
                  >
                    ACCEPT
                  </Link>
                  
                  <button
                    onClick={handleExit}
                    className="inline-flex items-center justify-center font-bold px-10 py-3 text-white bg-brand-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 shadow-md rounded-tr-lg rounded-bl-lg rounded-tl-none rounded-br-none transition-all duration-200"
                  >
                    EXIT
                  </button>

                  {/* Exit Message */}
                  {exitMessage && (
                    <div className="p-3 bg-yellow-100 border border-yellow-300 rounded-md text-sm text-yellow-800 max-w-sm">
                      {exitMessage}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </main>
        
      </div>
    </div>
  );
};

export default Home;
