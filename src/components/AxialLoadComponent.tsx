// Component for capturing the value and type of an axial load applied to a structure

import React from 'react';
import { AxialLoad } from '../types/loadCases';

interface AxialLoadComponentProps {
  value: AxialLoad;
  onChange: (updated: AxialLoad) => void;
}

const AxialLoadComponent: React.FC<AxialLoadComponentProps> = ({
  value,
  onChange,
}) => {
  const handleValueChange = (newValue: number) => {
    onChange({ ...value, Value: newValue });
  };

  const handleTypeChange = (type: 'Tension' | 'Compression') => {
    onChange({ ...value, Type: type });
  };

  return (
    <div className="space-y-4">
      {/* Axial Load Value */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Axial Load Value
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            step="0.01"
            value={value.Value}
            onChange={e => handleValueChange(parseFloat(e.target.value) || 0)}
            className="block w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="text-sm text-gray-600">kN</span>
        </div>
      </div>

      {/* Axial Load Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Axial Load Type
        </label>
        <div role="radiogroup" className="flex flex-wrap gap-2">
          {(['Tension', 'Compression'] as const).map(type => (
            <button
              key={type}
              role="radio"
              aria-checked={value.Type === type}
              onClick={() => handleTypeChange(type)}
              className={`px-4 py-2 rounded-md border transition-colors ${
                value.Type === type
                  ? 'bg-yellow-200 border-yellow-400 ring-2 ring-yellow-400'
                  : 'bg-white border-gray-300 hover:border-gray-400'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AxialLoadComponent;
