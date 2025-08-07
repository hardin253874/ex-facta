import React, { useState } from 'react';
import type { PrimaryLoadCase } from '@/types/loadCases';

// PrimaryLoadCasesComponent manages and displays a list of Primary Load Cases (PLCs) with editing and configuration
const MAX_PLCS = 20;

const defaultPLCName = (index: number) => `P. Load Case ${index + 1}`;

const createDefaultPLC = (index: number): PrimaryLoadCase => ({
  Name: defaultPLCName(index),
  Cases: [],
  Type: 'Strength',
  DeflectionLimit: 0,
});

const PrimaryLoadCasesComponent: React.FC = () => {
  const [plcs, setPLCs] = useState<PrimaryLoadCase[]>([]);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Add new PLC
  const handleAddPLC = () => {
    if (plcs.length >= MAX_PLCS) return;
    const newPLC = createDefaultPLC(plcs.length);
    setPLCs(prev => [...prev, newPLC]);
    setSelectedIdx(plcs.length);
  };

  // Delete selected PLC
  const handleDeletePLC = () => {
    if (selectedIdx === null) return;
    const newPLCs = plcs.filter((_, idx) => idx !== selectedIdx);
    setPLCs(newPLCs);
    setSelectedIdx(newPLCs.length === 0 ? null : Math.max(0, selectedIdx - 1));
  };

  // Rename PLC
  const handleRename = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedIdx === null) return;
    const newPLCs = [...plcs];
    newPLCs[selectedIdx] = { ...newPLCs[selectedIdx], Name: e.target.value };
    setPLCs(newPLCs);
  };

  // Change PLC Type
  const handleTypeChange = (type: 'Strength' | 'Serviceability') => {
    if (selectedIdx === null) return;
    const newPLCs = [...plcs];
    newPLCs[selectedIdx] = { ...newPLCs[selectedIdx], Type: type };
    setPLCs(newPLCs);
  };

  // Change Deflection Limit
  const handleDeflectionLimitChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (selectedIdx === null) return;
    const value = parseFloat(e.target.value) || 0;
    const newPLCs = [...plcs];
    newPLCs[selectedIdx] = { ...newPLCs[selectedIdx], DeflectionLimit: value };
    setPLCs(newPLCs);
  };

  return (
    <div className="flex gap-8">
      {/* Left: PLC Listbox */}
      <div className="w-56">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Primary Load Cases
        </label>
        <div className="border rounded h-64 overflow-y-auto bg-white">
          <ul
            role="listbox"
            aria-label="Primary Load Cases"
            className="divide-y divide-gray-100"
          >
            {plcs.map((plc, idx) => (
              <li
                key={idx}
                role="option"
                aria-selected={selectedIdx === idx}
                tabIndex={0}
                className={`px-4 py-2 cursor-pointer select-none transition-colors ${
                  selectedIdx === idx
                    ? 'bg-blue-100 font-semibold'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedIdx(idx)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') setSelectedIdx(idx);
                }}
              >
                {plc.Name}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-2 mt-3">
          <button
            type="button"
            className="flex-1 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm disabled:opacity-50"
            onClick={handleAddPLC}
            disabled={plcs.length >= MAX_PLCS}
          >
            New PLC
          </button>
          <button
            type="button"
            className="flex-1 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm disabled:opacity-50"
            onClick={handleDeletePLC}
            disabled={selectedIdx === null}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Right: PLC Details */}
      <div className="flex-1">
        {selectedIdx !== null && plcs[selectedIdx] && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={plcs[selectedIdx].Name}
                onChange={handleRename}
                className="w-full px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <div
                className="flex gap-4"
                role="radiogroup"
                aria-label="PLC Type"
              >
                <button
                  type="button"
                  role="radio"
                  aria-checked={plcs[selectedIdx].Type === 'Strength'}
                  className={`px-4 py-2 rounded border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    plcs[selectedIdx].Type === 'Strength'
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
                  aria-checked={plcs[selectedIdx].Type === 'Serviceability'}
                  className={`px-4 py-2 rounded border text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    plcs[selectedIdx].Type === 'Serviceability'
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
                value={plcs[selectedIdx].DeflectionLimit}
                onChange={handleDeflectionLimitChange}
                disabled={plcs[selectedIdx].Type !== 'Serviceability'}
                className={`w-32 px-3 py-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  plcs[selectedIdx].Type !== 'Serviceability'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : ''
                }`}
                min={0}
                step={0.01}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrimaryLoadCasesComponent;
