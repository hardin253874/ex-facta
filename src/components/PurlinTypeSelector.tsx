import React from 'react';

// PurlinTypeSelector component for selecting between Exacta®-C and Exacta®-Z purlin types
interface PurlinTypeSelectorProps {
  value: 'typeC' | 'typeZ';
  onChange: (value: 'typeC' | 'typeZ') => void;
}

const PurlinTypeSelector: React.FC<PurlinTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <div 
      className="flex border border-gray-200 rounded-lg overflow-hidden"
      role="radiogroup"
      aria-label="Purlin type selection"
    >
      <button
        type="button"
        onClick={() => onChange('typeC')}
        aria-pressed={value === 'typeC'}
        className={`flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
          value === 'typeC'
            ? 'bg-yellow-100 ring-2 ring-yellow-400 text-yellow-800'
            : 'bg-white hover:bg-gray-50 text-gray-700'
        }`}
      >
        <img
          src="/images/icon-exacta-c.jpg"
          alt="Exacta-C icon"
          className="w-8 h-8 object-cover rounded"
        />
        <span className="font-medium">Exacta®-C</span>
      </button>

      <button
        type="button"
        onClick={() => onChange('typeZ')}
        aria-pressed={value === 'typeZ'}
        className={`flex items-center gap-3 px-4 py-3 transition-all duration-200 ${
          value === 'typeZ'
            ? 'bg-yellow-100 ring-2 ring-yellow-400 text-yellow-800'
            : 'bg-white hover:bg-gray-50 text-gray-700'
        }`}
      >
        <img
          src="/images/icon-exacta-z.jpg"
          alt="Exacta-Z icon"
          className="w-8 h-8 object-cover rounded"
        />
        <span className="font-medium">Exacta®-Z</span>
      </button>
    </div>
  );
};

export default PurlinTypeSelector; 