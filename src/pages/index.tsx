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
        
        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-6xl mx-auto">
            {/* Desktop Layout - Two Columns */}
            <div className="hidden md:flex gap-8 items-start">
              {/* Left Column - Disclaimer Panel */}
              <div className="flex-1 max-w-2xl">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
                  {/* Title Bar */}
                  <div className="bg-gray-100 px-6 py-3 border-b border-gray-200">
                    <label 
                      htmlFor="disclaimer-text" 
                      className="text-lg font-bold text-gray-900"
                    >
                      Disclaimer:
                    </label>
                  </div>
                  
                  {/* Disclaimer Content */}
                  <div className="p-6">
                    <textarea
                      id="disclaimer-text"
                      value={disclaimerText}
                      onChange={(e) => setDisclaimerText(e.target.value)}
                      className="w-full h-80 p-4 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-brand-peach focus:border-transparent text-sm leading-relaxed"
                      placeholder="Disclaimer text will appear here..."
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Action Buttons */}
              <div className="w-80 space-y-4">
                <Link 
                  href="/menu" 
                  className="block w-full px-8 py-4 bg-brand-peach text-black font-medium text-center rounded-lg border border-orange-300 shadow-md hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200"
                >
                  Accept
                </Link>
                
                <button
                  onClick={handleExit}
                  className="w-full px-8 py-4 bg-gray-100 text-gray-800 font-medium rounded-lg border border-gray-300 shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
                >
                  Exit
                </button>

                {/* Exit Message */}
                {exitMessage && (
                  <div className="p-3 bg-yellow-100 border border-yellow-300 rounded-md text-sm text-yellow-800">
                    {exitMessage}
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Layout - Stacked */}
            <div className="md:hidden space-y-6">
              {/* Disclaimer Panel */}
              <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden">
                {/* Title Bar */}
                <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                  <label 
                    htmlFor="disclaimer-text-mobile" 
                    className="text-lg font-bold text-gray-900"
                  >
                    Disclaimer:
                  </label>
                </div>
                
                {/* Disclaimer Content */}
                <div className="p-4">
                  <textarea
                    id="disclaimer-text-mobile"
                    value={disclaimerText}
                    onChange={(e) => setDisclaimerText(e.target.value)}
                    className="w-full h-64 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-brand-peach focus:border-transparent text-sm leading-relaxed"
                    placeholder="Disclaimer text will appear here..."
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 max-w-sm mx-auto w-full">
                <Link 
                  href="/menu" 
                  className="block w-full px-6 py-3 bg-brand-peach text-black font-medium text-center rounded-lg border border-orange-300 shadow-md hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200"
                >
                  Accept
                </Link>
                
                <button
                  onClick={handleExit}
                  className="w-full px-6 py-3 bg-gray-100 text-gray-800 font-medium rounded-lg border border-gray-300 shadow-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-200"
                >
                  Exit
                </button>

                {/* Exit Message */}
                {exitMessage && (
                  <div className="p-3 bg-yellow-100 border border-yellow-300 rounded-md text-sm text-yellow-800">
                    {exitMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        
      </div>
    </div>
  );
};

export default Home;
