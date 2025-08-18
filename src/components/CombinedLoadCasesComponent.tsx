import React from 'react';
import type { CombinedLoadCase } from '@/types/loadCases';

interface CombinedLoadCasesComponentProps {
  value: CombinedLoadCase[];
  onChange: (value: CombinedLoadCase[]) => void;
  onNewRequested?: (newCLC: CombinedLoadCase) => void;
  selectedIndex: number | null;
  onSelectionChange: (index: number | null) => void;
  primaryLoadCases: any[];
}

const MAX_CLCS = 20;

const CombinedLoadCasesComponent: React.FC<CombinedLoadCasesComponentProps> = ({
  value,
  onChange,
  onNewRequested,
  selectedIndex,
  onSelectionChange,
  primaryLoadCases: _primaryLoadCases, // eslint-disable-line @typescript-eslint/no-unused-vars
}) => {
  // Add new CLC
  const handleAddCLC = () => {
    if (value.length >= MAX_CLCS) return;
    const newCLC: CombinedLoadCase = {
      Name: `C. Load Case ${value.length + 1}`,
      Cases: [],
      Type: 'Strength',
      DeflectionLimit: 0,
    };
    const updatedCLCs = [...value, newCLC];
    onChange(updatedCLCs);
    onSelectionChange(updatedCLCs.length - 1);
    onNewRequested?.(newCLC);
  };

  // Delete selected CLC
  const handleDeleteCLC = () => {
    if (selectedIndex === null) return;
    const updatedCLCs = value.filter((_, idx) => idx !== selectedIndex);
    onChange(updatedCLCs);
    onSelectionChange(
      updatedCLCs.length === 0 ? null : Math.max(0, selectedIndex - 1)
    );
  };

  // Rename CLC
  const handleRename = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedIndex === null) return;
    const updatedCLCs = [...value];
    updatedCLCs[selectedIndex] = {
      ...updatedCLCs[selectedIndex],
      Name: e.target.value,
    };
    onChange(updatedCLCs);
  };

  // Change CLC Type
  const handleTypeChange = (type: 'Strength' | 'Serviceability') => {
    if (selectedIndex === null) return;
    const updatedCLCs = [...value];
    updatedCLCs[selectedIndex] = { ...updatedCLCs[selectedIndex], Type: type };
    onChange(updatedCLCs);
  };

  // Change Deflection Limit
  const handleDeflectionLimitChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (selectedIndex === null) return;
    const deflectionValue = parseInt(e.target.value) || 0;
    const updatedCLCs = [...value];
    updatedCLCs[selectedIndex] = {
      ...updatedCLCs[selectedIndex],
      DeflectionLimit: deflectionValue,
    };
    onChange(updatedCLCs);
  };

  return (
    <div className="space-y-4">
      {/* CLC Listbox */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Combined Load Cases
        </label>
        <div className="border rounded h-64 overflow-y-auto bg-white">
          <ul
            role="listbox"
            aria-label="Combined Load Cases"
            className="divide-y divide-gray-100"
          >
            {value.map((clc, idx) => (
              <li
                key={idx}
                role="option"
                aria-selected={selectedIndex === idx}
                tabIndex={0}
                className={`px-4 py-2 cursor-pointer select-none transition-colors ${
                  selectedIndex === idx
                    ? 'bg-blue-100 font-semibold'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => onSelectionChange(idx)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ')
                    onSelectionChange(idx);
                }}
              >
                {clc.Name}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2 mt-3">
          <button
            type="button"
            className="flex-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm disabled:opacity-50"
            onClick={handleAddCLC}
            disabled={value.length >= MAX_CLCS}
          >
            New CLC
          </button>
          <button
            type="button"
            className="flex-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm disabled:opacity-50"
            onClick={handleDeleteCLC}
            disabled={selectedIndex === null}
          >
            Delete
          </button>
        </div>
      </div>

      {/* CLC Details */}
      {selectedIndex !== null && value[selectedIndex] && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={value[selectedIndex].Name}
              onChange={handleRename}
              maxLength={15}
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <div className="flex gap-4" role="radiogroup" aria-label="CLC Type">
              <button
                type="button"
                role="radio"
                aria-checked={value[selectedIndex].Type === 'Strength'}
                className={`px-4 py-2 rounded border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  value[selectedIndex].Type === 'Strength'
                    ? 'bg-blue-100 ring-2 ring-blue-500 font-semibold border-blue-400'
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleTypeChange('Strength')}
              >
                Strength Only
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={value[selectedIndex].Type === 'Serviceability'}
                className={`px-4 py-2 rounded border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  value[selectedIndex].Type === 'Serviceability'
                    ? 'bg-blue-100 ring-2 ring-blue-500 font-semibold border-blue-400'
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleTypeChange('Serviceability')}
              >
                Serviceability
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deflection Limit
            </label>
            <input
              type="number"
              value={value[selectedIndex].DeflectionLimit}
              onChange={handleDeflectionLimitChange}
              disabled={value[selectedIndex].Type !== 'Serviceability'}
              className={`w-32 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                value[selectedIndex].Type !== 'Serviceability'
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : ''
              }`}
              min={0}
              step={1}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CombinedLoadCasesComponent;
