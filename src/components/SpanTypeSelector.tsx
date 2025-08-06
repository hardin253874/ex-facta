import React from 'react';

// SpanType type definition for the 9 span types
export type SpanType = 'spanType1' | 'spanType2' | 'spanType3' | 'spanType4' | 'spanType5' | 'spanType6' | 'spanType7' | 'spanType8' | 'spanType9';

// SpanTypeSelector component for selecting from 9 different span types in a 3x3 grid
interface SpanTypeSelectorProps {
  value: SpanType;
  onChange: (value: SpanType) => void;
}

const SpanTypeSelector: React.FC<SpanTypeSelectorProps> = ({ value, onChange }) => {
  // Generate span types array for mapping
  const spanTypes: SpanType[] = [
    'spanType1', 'spanType2', 'spanType3',
    'spanType4', 'spanType5', 'spanType6',
    'spanType7', 'spanType8', 'spanType9'
  ];

  return (
    <div 
      className="grid grid-cols-3 gap-2"
      role="radiogroup"
      aria-label="Span type selection"
    >
      {spanTypes.map((spanType, index) => {
        const spanNumber = index + 1;
        const isSelected = value === spanType;
        
        return (
          <button
            key={spanType}
            type="button"
            onClick={() => onChange(spanType)}
            aria-pressed={isSelected}
            className={`flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
              isSelected
                ? 'ring-2 ring-blue-500 bg-blue-50'
                : 'hover:bg-gray-50'
            }`}
          >
            <img
              src={`/images/span-type-${spanNumber}.jpg`}
              alt={`Span ${spanNumber}`}
              className="w-16 h-16 object-cover rounded mb-2"
            />
            <span className="text-sm font-medium text-gray-700">
              Span {spanNumber}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default SpanTypeSelector; 