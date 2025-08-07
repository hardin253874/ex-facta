import React from 'react';

// PurlinSizeModeSelector component for selecting between checking and finding purlin size
interface PurlinSizeModeSelectorProps {
  value: 'checkPurlinSize' | 'findPurlinSize';
  onChange: (value: 'checkPurlinSize' | 'findPurlinSize') => void;
}

const PurlinSizeModeSelector: React.FC<PurlinSizeModeSelectorProps> = ({
  value,
  onChange,
}) => {
  return (
    <div
      className="bg-gray-100 p-4 rounded"
      role="radiogroup"
      aria-label="Purlin size mode selection"
    >
      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="purlin-size-mode"
            value="checkPurlinSize"
            checked={value === 'checkPurlinSize'}
            onChange={e =>
              onChange(e.target.value as 'checkPurlinSize' | 'findPurlinSize')
            }
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            aria-checked={value === 'checkPurlinSize'}
          />
          <span className="text-sm font-medium text-gray-700">
            Check Purlin Size
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="purlin-size-mode"
            value="findPurlinSize"
            checked={value === 'findPurlinSize'}
            onChange={e =>
              onChange(e.target.value as 'checkPurlinSize' | 'findPurlinSize')
            }
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            aria-checked={value === 'findPurlinSize'}
          />
          <span className="text-sm font-medium text-gray-700">
            Find Purlin Size
          </span>
        </label>
      </div>
    </div>
  );
};

export default PurlinSizeModeSelector;
