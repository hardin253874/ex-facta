import React from 'react';

// SpanType type definition for the 9 span types
export type SpanType = 'spanType1' | 'spanType2' | 'spanType3' | 'spanType4' | 'spanType5' | 'spanType6' | 'spanType7' | 'spanType8' | 'spanType9';

// SpanTypeSelector component for selecting from 9 different span types in a vertical list
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
    <div className="border p-2 rounded">
     <div className="flex flex-col items-center gap-1">
      {spanTypes.map((spanType, index) => {
        const spanNumber = index + 1;
        const isSelected = value === spanType;

        return (
          <div
            key={spanType}
            role="button"
            tabIndex={0}
            onClick={() => onChange(spanType)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onChange(spanType);
            }}
            className={`w-full max-w-full aspect-[382/36] flex items-center justify-center cursor-pointer ${
              isSelected ? 'border-2 border-green-500' : 'border-transparent'
            }`}
          >
            <img
              src={`/images/span-type-${spanNumber}.jpg`}
              alt={`Span ${spanNumber}`}
              className="w-full h-full object-cover"
            />
          </div>
        );
      })}
    </div>
    </div>
  );
};

export default SpanTypeSelector; 