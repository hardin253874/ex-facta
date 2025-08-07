import React, { useState } from 'react';
import type { CombinedLoadCase } from '@/types/loadCases';

// CombinedLoadCasesComponent manages a list of Combined Load Cases (CLCs) with editing and configuration
const MAX_CLCS = 20;

const defaultCLCName = (index: number) => `C. Load Case ${index + 1}`;

const createDefaultCLC = (index: number): CombinedLoadCase => ({
  Name: defaultCLCName(index),
  Cases: [],
  Type: 'Strength',
  DeflectionLimit: 0,
});

const CombinedLoadCasesComponent: React.FC = () => {
  const [clcs, setCLCs] = useState<CombinedLoadCase[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Add new CLC
  const handleAddCLC = () => {
    if (clcs.length >= MAX_CLCS) return;
    const newCLC = createDefaultCLC(clcs.length);
    setCLCs((prev) => [...prev, newCLC]);
    setSelectedIdx(clcs.length);
  };

  // Delete selected CLC
  const handleDeleteCLC = () => {
    if (selectedIdx === null) return;
    const newCLCs = clcs.filter((_, idx) => idx !== selectedIdx);
    setCLCs(newCLCs);
    setSelectedIdx(newCLCs.length === 0 ? null : Math.max(0, selectedIdx - 1));
  };

  // Rename CLC
  const handleRename = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedIdx === null) return;
    const newCLCs = [...clcs];
    newCLCs[selectedIdx] = { ...newCLCs[selectedIdx], Name: e.target.value };
    setCLCs(newCLCs);
  };

  // Change CLC Type
  const handleTypeChange = (type: 'Strength' | 'Serviceability') => {
    if (selectedIdx === null) return;
    const newCLCs = [...clcs];
    newCLCs[selectedIdx] = { ...newCLCs[selectedIdx], Type: type };
    setCLCs(newCLCs);
  };

  // Change Deflection Limit
  const handleDeflectionLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedIdx === null) return;
    const value = parseInt(e.target.value) || 0;
    const newCLCs = [...clcs];
    newCLCs[selectedIdx] = { ...newCLCs[selectedIdx], DeflectionLimit: value };
    setCLCs(newCLCs);
  };

  return (
    <div className="space-y-4">
      {/* CLC Listbox */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Combined Load Cases</label>
        <div className="border rounded h-64 overflow-y-auto bg-white">
          <ul role="listbox" aria-label="Combined Load Cases" className="divide-y divide-gray-100">
            {clcs.map((clc, idx) => (
              <li
                key={idx}
                role="option"
                aria-selected={selectedIdx === idx}
                tabIndex={0}
                className={`px-4 py-2 cursor-pointer select-none transition-colors ${
                  selectedIdx === idx ? 'bg-blue-100 font-semibold' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedIdx(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setSelectedIdx(idx);
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
            disabled={clcs.length >= MAX_CLCS}
          >
            New CLC
          </button>
          <button
            type="button"
            className="flex-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm disabled:opacity-50"
            onClick={handleDeleteCLC}
            disabled={selectedIdx === null}
          >
            Delete
          </button>
        </div>
      </div>

      {/* CLC Details */}
      {selectedIdx !== null && clcs[selectedIdx] && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              value={clcs[selectedIdx].Name}
              onChange={handleRename}
              maxLength={15}
              className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
            <div className="flex gap-4" role="radiogroup" aria-label="CLC Type">
              <button
                type="button"
                role="radio"
                aria-checked={clcs[selectedIdx].Type === 'Strength'}
                className={`px-4 py-2 rounded border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  clcs[selectedIdx].Type === 'Strength'
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
                aria-checked={clcs[selectedIdx].Type === 'Serviceability'}
                className={`px-4 py-2 rounded border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  clcs[selectedIdx].Type === 'Serviceability'
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Deflection Limit</label>
            <input
              type="number"
              value={clcs[selectedIdx].DeflectionLimit}
              onChange={handleDeflectionLimitChange}
              disabled={clcs[selectedIdx].Type !== 'Serviceability'}
              className={`w-32 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                clcs[selectedIdx].Type !== 'Serviceability' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''
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