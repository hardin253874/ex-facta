import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { AppHeader } from '../components/layout';

type PopupSpec = {
  header1: string;
  body1: string;
  header2: string;
  body2: string;
};

type PopupKey =
  | 'exacta'
  | 'stramit'
  | 'material'
  | 'specification'
  | 'about'
  | 'gallery';

const POPUPS: Record<PopupKey, PopupSpec> = {
  exacta: {
    header1: 'Exacta® Product Range',
    body1:
      'Exacta® purlins are high-strength, lightweight steel sections designed for roofing applications. Available in both C and Z profiles, they offer superior load-bearing capacity and easy installation. The Exacta® range includes various depths and thicknesses to suit different span requirements and loading conditions.\n\nKey features:\n• High strength-to-weight ratio\n• Consistent quality manufacturing\n• Optimized web perforations\n• Compatible with standard fastening systems',
    header2: 'Technical Specifications',
    body2:
      'Material: High-tensile steel (G550)\nYield Strength: 550 MPa minimum\nCoating: Zinc-aluminum alloy (ZAM®)\nThickness Range: 1.0mm to 2.0mm\nDepth Range: 100mm to 350mm\n\nCompliance:\n• AS/NZS 4600 (Cold-formed steel structures)\n• AS/NZS 1397 (Continuous hot-dip metallic coated steel)\n• Building Code of Australia (BCA)\n\nQuality certifications and test reports available upon request.',
  },
  stramit: {
    header1: 'Company History',
    body1:
      "Stramit Corporation has been a leading manufacturer of steel building products in Australia for over 50 years. Founded in 1969, the company has grown from a small regional operation to become one of Australia's most trusted names in structural steel and roofing solutions.\n\nMilestones:\n• 1969: Company founded\n• 1980s: Expansion into purlin manufacturing\n• 1990s: Introduction of Exacta® product line\n• 2000s: Advanced coating technologies\n• 2010s: Sustainable manufacturing initiatives",
    header2: 'Stramit Today',
    body2:
      'Today, Stramit operates state-of-the-art manufacturing facilities across Australia, employing advanced roll-forming technology and quality control systems. Our commitment to innovation and sustainability drives continuous improvement in our products and processes.\n\nCurrent Operations:\n• Multiple manufacturing facilities\n• National distribution network\n• R&D partnerships with universities\n• Environmental management systems\n• Comprehensive technical support services\n\nWe continue to invest in new technologies and sustainable practices to meet the evolving needs of the construction industry.',
  },
  material: {
    header1: 'Steel Properties',
    body1:
      'Our structural steel products are manufactured from high-quality materials selected for their superior performance characteristics. All steel meets or exceeds Australian and international standards for strength, durability, and corrosion resistance.\n\nMaterial Specifications:\n• Base Metal: High-tensile steel\n• Minimum Yield Strength: 550 MPa\n• Tensile Strength: 570-750 MPa\n• Elongation: Minimum 8%\n• Surface Finish: Hot-dip coated\n\nAll materials are sourced from certified suppliers and undergo rigorous quality testing before processing.',
    header2: 'Coating Systems',
    body2:
      'Advanced coating systems provide long-term protection against corrosion and weathering. Our products feature multiple coating options to suit different environmental conditions and aesthetic requirements.\n\nAvailable Coatings:\n• ZAM® (Zinc-Aluminum-Magnesium)\n• Galvanized steel (Z350-Z600)\n• COLORBOND® steel\n• Custom color matching available\n\nCoating Thickness: 150-275 g/m²\nDurability: 25+ years typical service life\nWarranty: Comprehensive warranty programs available',
  },
  specification: {
    header1: 'Design Standards',
    body1:
      'All Stramit products are designed and manufactured in accordance with current Australian and international building codes and standards. Our technical team provides comprehensive specification guidance to ensure optimal performance and compliance.\n\nApplicable Standards:\n• AS/NZS 4600 (Cold-formed steel structures)\n• AS/NZS 1170 (Structural design actions)\n• AS/NZS 1397 (Continuous hot-dip metallic coated steel)\n• Building Code of Australia (BCA)\n\nSpecification documents include detailed load tables, span charts, and installation guidelines.',
    header2: 'Installation Guidelines',
    body2:
      'Proper installation is critical for optimal performance and warranty compliance. Stramit provides detailed installation guidelines and technical support to ensure correct application of our products.\n\nInstallation Requirements:\n• Qualified installers recommended\n• Proper fastener selection and spacing\n• Adequate bearing and support conditions\n• Weather protection during installation\n• Quality control inspections\n\nTechnical support available:\n• Site visits and consultation\n• Installation training programs\n• Detailed installation manuals\n• 24/7 technical helpline',
  },
  about: {
    header1: 'Our Mission',
    body1:
      'Stramit is committed to providing innovative, high-quality steel building products that exceed customer expectations while contributing to sustainable construction practices. We strive to be the preferred partner for builders, engineers, and architects across Australia.\n\nCore Values:\n• Quality excellence in all products\n• Customer service and support\n• Innovation and continuous improvement\n• Environmental responsibility\n• Safety in all operations\n\nOur team of experienced professionals is dedicated to helping you achieve successful project outcomes.',
    header2: 'Contact Information',
    body2:
      "Get in touch with our experienced team for technical support, product information, or project consultation. We're here to help you select the right products and provide ongoing support throughout your project.\n\nHead Office:\nStramit Corporation Pty Ltd\n123 Industrial Drive\nMelbourne, VIC 3000\n\nPhone: 1800 STRAMIT (1800 787 264)\nEmail: info@stramit.com.au\nWebsite: www.stramit.com.au\n\nRegional offices and distributors located throughout Australia. Contact us to find your nearest representative.",
  },
  gallery: {
    header1: 'Project Gallery',
    body1:
      'Explore our comprehensive gallery of completed projects showcasing the versatility and performance of Stramit products. From commercial warehouses to residential developments, our products have been successfully used in thousands of projects across Australia.\n\nProject Categories:\n• Industrial and warehouse facilities\n• Commercial buildings\n• Agricultural structures\n• Residential applications\n• Infrastructure projects\n\nHigh-resolution images and project details available for reference and inspiration.',
    header2: 'Installation Examples',
    body2:
      'Detailed photographic documentation of proper installation techniques and best practices. These examples demonstrate correct application methods and help ensure optimal performance of Stramit products.\n\nAvailable Documentation:\n• Step-by-step installation photos\n• Before and after comparisons\n• Common installation mistakes to avoid\n• Quality control checkpoints\n• Finished project showcases\n\nUse these visual guides in conjunction with our technical documentation for successful project completion.',
  },
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  spec: PopupSpec;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, spec }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLTextAreaElement>(null);
  const [body1, setBody1] = useState(spec.body1);
  const [body2, setBody2] = useState(spec.body2);

  useEffect(() => {
    if (isOpen) {
      setBody1(spec.body1);
      setBody2(spec.body2);
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      // Focus the first textarea
      setTimeout(() => firstInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, spec]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }

    return undefined;
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`modal-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 space-y-6">
          <div>
            <h2
              id={`modal-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
              className="text-xl font-bold text-gray-900 mb-4"
            >
              {title}
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-md font-semibold text-gray-800 mb-2">
                  {spec.header1}
                </h3>
                <textarea
                  ref={firstInputRef}
                  value={body1}
                  onChange={e => setBody1(e.target.value)}
                  className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-brand-peach focus:border-transparent text-sm"
                  placeholder="Enter text here..."
                />
              </div>

              <div>
                <h3 className="text-md font-semibold text-gray-800 mb-2">
                  {spec.header2}
                </h3>
                <textarea
                  value={body2}
                  onChange={e => setBody2(e.target.value)}
                  className="w-full h-32 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-brand-peach focus:border-transparent text-sm"
                  placeholder="Enter text here..."
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-brand-peach text-black font-medium rounded-md hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-300 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuPage: React.FC = () => {
  const [openPopup, setOpenPopup] = useState<PopupKey | null>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handlePopupClose = () => {
    const wasOpen = openPopup;
    setOpenPopup(null);

    // Restore focus to the button that opened the modal
    if (wasOpen && buttonRefs.current[wasOpen]) {
      setTimeout(() => buttonRefs.current[wasOpen]?.focus(), 100);
    }
  };

  const handlePopupOpen = (key: PopupKey) => {
    setOpenPopup(key);
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <Head>
        <title>Ex-Facta Menu - Engineering Design Software</title>
        <meta
          name="description"
          content="Main menu for Ex-Facta engineering design software - Access product information, specifications, and project tools"
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
              {/* Left Column - Hero, Buttons, Copyright (40% width on large screens) */}
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
                  {/* Buttons Grid */}
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <button
                      ref={el => {
                        buttonRefs.current['exacta'] = el;
                      }}
                      onClick={() => handlePopupOpen('exacta')}
                      className="bg-black text-white font-semibold px-6 py-3 shadow-md rounded-tr-lg rounded-bl-lg rounded-tl-none rounded-br-none hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/50 transition-all duration-200"
                    >
                      Exacta® Info
                    </button>

                    <button
                      ref={el => {
                        buttonRefs.current['stramit'] = el;
                      }}
                      onClick={() => handlePopupOpen('stramit')}
                      className="bg-black text-white font-semibold px-6 py-3 shadow-md rounded-tr-lg rounded-bl-lg rounded-tl-none rounded-br-none hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/50 transition-all duration-200"
                    >
                      Stramit Info
                    </button>

                    <button
                      ref={el => {
                        buttonRefs.current['material'] = el;
                      }}
                      onClick={() => handlePopupOpen('material')}
                      className="bg-black text-white font-semibold px-6 py-3 shadow-md rounded-tr-lg rounded-bl-lg rounded-tl-none rounded-br-none hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/50 transition-all duration-200"
                    >
                      Material Info
                    </button>

                    <button
                      ref={el => {
                        buttonRefs.current['specification'] = el;
                      }}
                      onClick={() => handlePopupOpen('specification')}
                      className="bg-black text-white font-semibold px-6 py-3 shadow-md rounded-tr-lg rounded-bl-lg rounded-tl-none rounded-br-none hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/50 transition-all duration-200"
                    >
                      Sample Specification
                    </button>

                    <button
                      ref={el => {
                        buttonRefs.current['about'] = el;
                      }}
                      onClick={() => handlePopupOpen('about')}
                      className="bg-black text-white font-semibold px-6 py-3 shadow-md rounded-tr-lg rounded-bl-lg rounded-tl-none rounded-br-none hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/50 transition-all duration-200"
                    >
                      About Us
                    </button>

                    <button
                      ref={el => {
                        buttonRefs.current['gallery'] = el;
                      }}
                      onClick={() => handlePopupOpen('gallery')}
                      className="bg-black text-white font-semibold px-6 py-3 shadow-md rounded-tr-lg rounded-bl-lg rounded-tl-none rounded-br-none hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/50 transition-all duration-200"
                    >
                      Project Gallery
                    </button>
                  </div>

                  {/* Enter Projects Button - Full Width */}
                  <div className="mt-5">
                    <Link
                      href="/project"
                      className="w-full inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-black font-semibold px-8 py-4 shadow-md rounded-tr-lg rounded-bl-lg rounded-tl-none rounded-br-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-700 transition-all duration-200"
                    >
                      Enter Projects
                    </Link>
                  </div>
                </div>

                {/* Copyright Line - Pinned to bottom */}
                <p className="mt-2 text-xs text-gray-500">
                  © Copyright Stramit Corporation Pty Ltd August 2025
                </p>
              </div>

              {/* Right Column - Empty for now (60% width on large screens) */}
              <div className="min-w-0">
                {/* Reserved space - empty for now */}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      {openPopup && (
        <Modal
          isOpen={!!openPopup}
          onClose={handlePopupClose}
          title={
            openPopup.charAt(0).toUpperCase() +
            openPopup.slice(1) +
            ' Information'
          }
          spec={POPUPS[openPopup]}
        />
      )}
    </div>
  );
};

export default MenuPage;
