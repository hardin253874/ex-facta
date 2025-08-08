// Component for configuring a moving load across a structure with left/right bounds, units, and test positions

import React from 'react';
import { MovingLoad, LoadLocation } from '../types/loadCases';

interface MovingLoadComponentProps {
  value: MovingLoad;
  onChange: (updated: MovingLoad) => void;
}

interface LoadLocationSubComponentProps {
  title: string;
  value: LoadLocation;
  onChange: (updated: LoadLocation) => void;
}

const LoadLocationSubComponent: React.FC<LoadLocationSubComponentProps> = ({
  title,
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

  const handleLengthChange = (length: number) => {
    onChange({ ...value, Length: length });
  };

  return (
    <div className="border rounded-lg p-3 space-y-3">
      <h4 className="text-sm font-medium text-gray-700">{title}</h4>
      {/* Point of Reference */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Point of Reference
        </label>
        <div role="radiogroup" className="flex flex-col gap-1">
          <button
            role="radio"
            aria-checked={value.PointOfReference === 'leftEnd'}
            onClick={() => handlePointOfReferenceChange('leftEnd')}
            className={`text-left px-2 py-1 text-xs rounded border transition-colors ${
              value.PointOfReference === 'leftEnd'
                ? 'bg-yellow-200 border-yellow-400 ring-1 ring-yellow-400'
                : 'bg-white border-gray-300 hover:border-gray-400'
            }`}
          >
            Left End of Structure
          </button>
          <button
            role="radio"
            aria-checked={value.PointOfReference === 'rightEnd'}
            onClick={() => handlePointOfReferenceChange('rightEnd')}
            className={`text-left px-2 py-1 text-xs rounded border transition-colors ${
              value.PointOfReference === 'rightEnd'
                ? 'bg-yellow-200 border-yellow-400 ring-1 ring-yellow-400'
                : 'bg-white border-gray-300 hover:border-gray-400'
            }`}
          >
            Right End of Structure
          </button>
        </div>
      </div>

      {/* Length Type */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Length
        </label>
        <div role="radiogroup" className="flex gap-2">
          <button
            role="radio"
            aria-checked={value.LengthType === 'mm'}
            onClick={() => handleLengthTypeChange('mm')}
            className={`px-2 py-1 text-xs rounded border transition-colors ${
              value.LengthType === 'mm'
                ? 'bg-yellow-200 border-yellow-400 ring-1 ring-yellow-400'
                : 'bg-white border-gray-300 hover:border-gray-400'
            }`}
          >
            Absolute
          </button>
          <button
            role="radio"
            aria-checked={value.LengthType === 'length'}
            onClick={() => handleLengthTypeChange('length')}
            className={`px-2 py-1 text-xs rounded border transition-colors ${
              value.LengthType === 'length'
                ? 'bg-yellow-200 border-yellow-400 ring-1 ring-yellow-400'
                : 'bg-white border-gray-300 hover:border-gray-400'
            }`}
          >
            Fraction of Length
          </button>
        </div>
      </div>

      {/* Length Input */}
      <div>
        <div className="flex items-center gap-1">
          <input
            type="number"
            step="0.01"
            value={value.Length}
            onChange={e => handleLengthChange(parseFloat(e.target.value) || 0)}
            className="block w-20 px-2 py-1 text-xs border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="text-xs text-gray-500">
            {value.LengthType === 'mm' ? 'mm' : 'Length'}
          </span>
        </div>
      </div>
    </div>
  );
};

const MovingLoadComponent: React.FC<MovingLoadComponentProps> = ({
  value,
  onChange,
}) => {
  const handleLeftBoundChange = (leftBound: LoadLocation) => {
    onChange({ ...value, LeftBound: leftBound });
  };

  const handleRightBoundChange = (rightBound: LoadLocation) => {
    onChange({ ...value, RightBound: rightBound });
  };

  const handleWidthChange = (width: number) => {
    onChange({ ...value, WidthMM: width });
  };

  const handleUnitsChange = (units: 'kN/m' | 'kPa') => {
    onChange({ ...value, Units: units });
  };

  const handlePressureChange = (pressure: number) => {
    onChange({ ...value, PressureKPa: pressure });
  };

  const handlePurlinSpacingChange = (spacing: number) => {
    onChange({ ...value, PurlinSpacingMM: spacing });
  };

  const handleNumTestPositionsChange = (numPositions: number) => {
    onChange({ ...value, NumTestPositions: numPositions });
  };

  const isPressureMode = value.Units === 'kPa';

  return (
    <div className="space-y-4">
      {/* Bounds of Moving Load */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bounds of Moving Load
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LoadLocationSubComponent
            title="Left Bound"
            value={value.LeftBound}
            onChange={handleLeftBoundChange}
          />
          <LoadLocationSubComponent
            title="Right Bound"
            value={value.RightBound}
            onChange={handleRightBoundChange}
          />
        </div>
      </div>

      {/* Width of Moving Load */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter width of moving load
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            step="0.01"
            value={value.WidthMM}
            onChange={e => handleWidthChange(parseFloat(e.target.value) || 0)}
            disabled={!isPressureMode}
            aria-disabled={!isPressureMode}
            className={`block w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              !isPressureMode ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />
          <span className="text-sm text-gray-600">mm</span>
        </div>
      </div>

      {/* Units and Right-side fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Units */}
        <div className="border rounded-lg p-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Units
          </label>
          <div role="radiogroup" className="space-y-2">
            {(['kN/m', 'kPa'] as const).map(unit => (
              <button
                key={unit}
                role="radio"
                aria-checked={value.Units === unit}
                onClick={() => handleUnitsChange(unit)}
                className={`block w-full text-left px-3 py-2 rounded-md border transition-colors ${
                  value.Units === unit
                    ? 'bg-yellow-200 border-yellow-400 ring-2 ring-yellow-400'
                    : 'bg-white border-gray-300 hover:border-gray-400'
                }`}
              >
                {unit}
              </button>
            ))}
          </div>
        </div>

        {/* Right-side fields */}
        <div className="border rounded-lg p-3 space-y-3">
          {/* Pressure */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pressure:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.01"
                value={value.PressureKPa}
                onChange={e =>
                  handlePressureChange(parseFloat(e.target.value) || 0)
                }
                disabled={!isPressureMode}
                aria-disabled={!isPressureMode}
                className={`block w-24 px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 ${
                  !isPressureMode ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
              <span className="text-sm text-gray-500">kPa</span>
            </div>
          </div>

          {/* Purlin Spacing */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Purlin Spacing:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={value.PurlinSpacingMM}
                onChange={e =>
                  handlePurlinSpacingChange(parseInt(e.target.value) || 0)
                }
                className="block w-24 px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="text-sm text-gray-500">mm</span>
            </div>
          </div>

          {/* Number of test positions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of test positions:
            </label>
            <input
              type="number"
              value={value.NumTestPositions}
              onChange={e =>
                handleNumTestPositionsChange(parseInt(e.target.value) || 20)
              }
              placeholder="20"
              className="block w-24 px-2 py-1 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovingLoadComponent;
