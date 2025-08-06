import React from 'react';

// SpanNumberInput component for inputting the number of spans (1-10)
interface SpanNumberInputProps {
  value: number;
  onChange: (value: number) => void;
}

const SpanNumberInput: React.FC<SpanNumberInputProps> = ({ value, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value, 10);
    
    // Only allow valid numbers between 1 and 10
    if (!isNaN(inputValue) && inputValue >= 1 && inputValue <= 10) {
      onChange(inputValue);
    }
  };

  return (
    <div className="space-y-1">
      <label 
        htmlFor="span-number-input" 
        className="block text-sm font-medium text-gray-700"
      >
        No. of Spans
      </label>
      <div className="flex items-center gap-2">
        <input
          id="span-number-input"
          type="number"
          min="1"
          max="10"
          value={value}
          onChange={handleInputChange}
          className="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          aria-describedby="span-number-hint"
        />
        <span 
          id="span-number-hint" 
          className="text-xs text-gray-500"
        >
          Max. 10
        </span>
      </div>
    </div>
  );
};

export default SpanNumberInput; 