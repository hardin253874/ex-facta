import React from 'react';
import type { LoadLocation } from '@/types/loadCases';

// LoadLocationComponent configures the location of a load applied along a structural span
interface LoadLocationComponentProps {
  value: LoadLocation;
  onChange: (updated: LoadLocation) => void;
}

const LoadLocationComponent: React.FC<LoadLocationComponentProps> = ({
  value,
  onChange,
}) => {
  const handlePointOfReferenceChange = (
    pointOfReference: 'leftEnd' | 'rightEnd'
  ) => {
    onChange({ ...value, PointOfReference: pointOfReference });
  };

  const handleLengthTypeChange = (lengthType: 'mm' | 'length') => {
    onChange({ ...value, LengthType: lengthType });
  };

  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const lengthValue = parseFloat(e.target.value) || 0;
    onChange({ ...value, Length: lengthValue });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <h3 className="text-lg font-medium text-gray-900">{value.Title}</h3>

      {/* Point of Reference */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Point of Reference
        </label>
        <div
          className="flex gap-4"
          role="radiogroup"
          aria-label="Point of Reference"
        >
          <button
            type="button"
            role="radio"
            aria-checked={value.PointOfReference === 'leftEnd'}
            className={`px-4 py-2 rounded border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              value.PointOfReference === 'leftEnd'
                ? 'bg-blue-100 ring-2 ring-blue-500 font-semibold border-blue-400'
                : 'bg-white border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => handlePointOfReferenceChange('leftEnd')}
          >
            Left End of Span
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={value.PointOfReference === 'rightEnd'}
            className={`px-4 py-2 rounded border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              value.PointOfReference === 'rightEnd'
                ? 'bg-blue-100 ring-2 ring-blue-500 font-semibold border-blue-400'
                : 'bg-white border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => handlePointOfReferenceChange('rightEnd')}
          >
            Right End of Span
          </button>
        </div>
      </div>

      {/* Length Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Length
        </label>
        <div className="flex gap-4" role="radiogroup" aria-label="Length Type">
          <button
            type="button"
            role="radio"
            aria-checked={value.LengthType === 'mm'}
            className={`px-4 py-2 rounded border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              value.LengthType === 'mm'
                ? 'bg-blue-100 ring-2 ring-blue-500 font-semibold border-blue-400'
                : 'bg-white border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => handleLengthTypeChange('mm')}
          >
            Absolute
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={value.LengthType === 'length'}
            className={`px-4 py-2 rounded border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              value.LengthType === 'length'
                ? 'bg-blue-100 ring-2 ring-blue-500 font-semibold border-blue-400'
                : 'bg-white border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => handleLengthTypeChange('length')}
          >
            Fraction of Length
          </button>
        </div>
      </div>

      {/* Length Input */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Length * {value.LengthType === 'mm' ? 'mm' : 'Length'}
        </label>
        <input
          type="number"
          value={value.Length}
          onChange={handleLengthChange}
          className="w-32 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          min={0}
          step={0.01}
        />
      </div>
    </div>
  );
};

export default LoadLocationComponent;
