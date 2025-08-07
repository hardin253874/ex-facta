import React from 'react';

// LoadCaseTypeSelector allows the user to select between Primary Load Cases (PLCs) and Combined Load Cases (CLCs)
interface LoadCaseTypeSelectorProps {
  value: 'PLC' | 'CLC';
  onChange: (value: 'PLC' | 'CLC') => void;
}

const options = [
  {
    key: 'PLC' as const,
    label: 'Primary Load Cases (PLCs)',
    description: 'Recommend 0.1kPa for dead load due to metal roofing and purlins',
  },
  {
    key: 'CLC' as const,
    label: 'Combined Load Cases (CLCs)',
    description: 'Factored combinations of PLCs',
  },
];

const LoadCaseTypeSelector: React.FC<LoadCaseTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <div role="radiogroup" aria-label="Load case type selection" className="flex flex-col gap-4">
      {options.map((option) => {
        const selected = value === option.key;
        return (
          <button
            key={option.key}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={0}
            onClick={() => onChange(option.key)}
            className={`w-full text-left rounded p-4 border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 flex flex-col gap-1
              ${selected ? 'ring-2 ring-blue-500 bg-blue-100 font-semibold border-blue-400' : 'border-gray-300 bg-white hover:bg-gray-50'}`}
          >
            <span className="text-base">{option.label}</span>
            <span className="text-xs text-gray-600">{option.description}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LoadCaseTypeSelector;