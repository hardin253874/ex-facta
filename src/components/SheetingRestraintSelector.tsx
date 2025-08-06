import React from 'react';

// SheetingRestraintSelector component for selecting whether sheeting provides restraint to purlin
interface SheetingRestraintSelectorProps {
  value: boolean;
  onChange: (value: boolean) => void;
}

const SheetingRestraintSelector: React.FC<SheetingRestraintSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="bg-gray-100 p-4 rounded">
      <label className="block text-sm font-medium mb-2 text-gray-700">
        Restraint from sheeting attached directly to purlin?
      </label>
      
      <div 
        className="flex flex-row gap-4"
        role="radiogroup"
        aria-label="Sheeting restraint selection"
      >
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sheeting-restraint"
            value="true"
            checked={value === true}
            onChange={() => onChange(true)}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            aria-checked={value === true}
          />
          <span className="text-sm text-gray-700">
            Yes
          </span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sheeting-restraint"
            value="false"
            checked={value === false}
            onChange={() => onChange(false)}
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            aria-checked={value === false}
          />
          <span className="text-sm text-gray-700">
            No
          </span>
        </label>
      </div>
    </div>
  );
};

export default SheetingRestraintSelector; 