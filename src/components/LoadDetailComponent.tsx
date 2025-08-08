// Component for configuring detailed parameters of a structural load including type, direction, application, units, and force

import React from 'react';
import { Load } from '../types/loadCases';

interface LoadDetailComponentProps {
  value: Load;
  onChange: (updated: Load) => void;
}

const LoadDetailComponent: React.FC<LoadDetailComponentProps> = ({
  value,
  onChange,
}) => {
  const handleLoadTypeChange = (loadType: 'UDL' | 'Point' | 'Line') => {
    const updated: Load = {
      ...value,
      LoadType: loadType,
      LoadDirection: loadType === 'Line' ? value.LoadDirection : '',
      LoadApplication: loadType === 'Point' ? '' : value.LoadApplication,
      Units: '',
      Force: value.Force,
    };
    onChange(updated);
  };

  const handleLoadDirectionChange = (
    direction: 'parallel' | 'perpendicular'
  ) => {
    onChange({ ...value, LoadDirection: direction });
  };

  const handleLoadApplicationChange = (
    application: 'part' | 'one' | 'multiple' | 'all'
  ) => {
    onChange({ ...value, LoadApplication: application });
  };

  const handleUnitsChange = (units: 'kN/m' | 'kN' | 'kPa') => {
    onChange({ ...value, Units: units });
  };

  const handleForceChange = (force: number) => {
    onChange({ ...value, Force: force });
  };

  const getUnitsOptions = () => {
    switch (value.LoadType) {
      case 'UDL':
        return ['kN/m', 'kPa'];
      case 'Point':
        return ['kN'];
      case 'Line':
        return ['kN/m'];
      default:
        return [];
    }
  };

  return (
    <div className="space-y-4">
      {/* Load Type - Always Visible */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Load Type
        </label>
        <div role="radiogroup" className="flex flex-wrap gap-2">
          {(['UDL', 'Point', 'Line'] as const).map(type => (
            <button
              key={type}
              role="radio"
              aria-checked={value.LoadType === type}
              onClick={() => handleLoadTypeChange(type)}
              className={`px-4 py-2 rounded-md border transition-colors ${
                value.LoadType === type
                  ? 'bg-yellow-200 border-yellow-400 ring-2 ring-yellow-400'
                  : 'bg-white border-gray-300 hover:border-gray-400'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Load Direction - Only visible when LoadType is 'Line' */}
      {value.LoadType === 'Line' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Load Direction
          </label>
          <div role="radiogroup" className="flex flex-wrap gap-2">
            <button
              role="radio"
              aria-checked={value.LoadDirection === 'parallel'}
              onClick={() => handleLoadDirectionChange('parallel')}
              className={`px-4 py-2 rounded-md border transition-colors ${
                value.LoadDirection === 'parallel'
                  ? 'bg-yellow-200 border-yellow-400 ring-2 ring-yellow-400'
                  : 'bg-white border-gray-300 hover:border-gray-400'
              }`}
            >
              Parallel to Span
            </button>
            <button
              role="radio"
              aria-checked={value.LoadDirection === 'perpendicular'}
              onClick={() => handleLoadDirectionChange('perpendicular')}
              className={`px-4 py-2 rounded-md border transition-colors ${
                value.LoadDirection === 'perpendicular'
                  ? 'bg-yellow-200 border-yellow-400 ring-2 ring-yellow-400'
                  : 'bg-white border-gray-300 hover:border-gray-400'
              }`}
            >
              Perpendicular to Span
            </button>
          </div>
        </div>
      )}

      {/* Load Application - Hidden when LoadType is 'Point' */}
      {value.LoadType !== 'Point' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Load Application
          </label>
          <div role="radiogroup" className="flex flex-wrap gap-2">
            {[
              { value: 'part', label: 'Part of Span' },
              { value: 'one', label: 'One Span' },
              { value: 'multiple', label: 'Multiple Spans' },
              { value: 'all', label: 'All Spans' },
            ].map(option => (
              <button
                key={option.value}
                role="radio"
                aria-checked={value.LoadApplication === option.value}
                onClick={() =>
                  handleLoadApplicationChange(
                    option.value as 'part' | 'one' | 'multiple' | 'all'
                  )
                }
                className={`px-4 py-2 rounded-md border transition-colors ${
                  value.LoadApplication === option.value
                    ? 'bg-yellow-200 border-yellow-400 ring-2 ring-yellow-400'
                    : 'bg-white border-gray-300 hover:border-gray-400'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Units */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Units
        </label>
        <div role="radiogroup" className="flex flex-wrap gap-2">
          {getUnitsOptions().map(unit => (
            <button
              key={unit}
              role="radio"
              aria-checked={value.Units === unit}
              onClick={() => handleUnitsChange(unit as 'kN/m' | 'kN' | 'kPa')}
              className={`px-4 py-2 rounded-md border transition-colors ${
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

      {/* Force */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Force
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            step="0.01"
            value={value.Force}
            onChange={e => handleForceChange(parseFloat(e.target.value) || 0)}
            className="block w-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <span className="text-sm text-gray-600">{value.Units}</span>
        </div>
      </div>
    </div>
  );
};

export default LoadDetailComponent;
