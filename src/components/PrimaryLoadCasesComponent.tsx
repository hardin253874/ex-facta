import React, { useState } from 'react';
import type { PrimaryLoadCase, LoadCase } from '@/types/loadCases';

interface PrimaryLoadCasesComponentProps {
  value: PrimaryLoadCase;
  onChange: (value: PrimaryLoadCase) => void;
}

const PrimaryLoadCasesComponent: React.FC<PrimaryLoadCasesComponentProps> = ({ value, onChange }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Add new Load
  const handleAddNew = () => {
    if (value.Cases.length >= 10) return;
    const next = { ...value, Cases: [...value.Cases, { Name: `Load ${value.Cases.length + 1}` }] };
    onChange(next);
    setSelectedIndex(next.Cases.length - 1);
  };

  // Delete selected Load
  const handleDeleteSelected = () => {
    if (selectedIndex === null) return;
    const next = { ...value, Cases: value.Cases.filter((_, idx) => idx !== selectedIndex) };
    onChange(next);
    setSelectedIndex(next.Cases.length === 0 ? null : Math.max(0, selectedIndex - 1));
  };

  return (
    <div className="space-y-2">
      <h3 className="text-base font-semibold text-gray-900">Loads in this Load Case (Max. 10)</h3>

      <div className="flex flex-col gap-4">
        {/* LEFT */}
        <div>
          <div className="border rounded-md">
            <select
              className="w-full h-56 p-2 outline-none"
              size={10}
              value={selectedIndex ?? -1}
              onChange={(e) => setSelectedIndex(Number(e.target.value))}
            >
              {value.Cases.map((c, i) => (
                <option key={i} value={i}>{c.Name}</option>
              ))}
            </select>
          </div>

          <div className="mt-3 flex gap-3">
            <button
              type="button"
              className="flex-1 rounded-md bg-blue-600 text-white px-3 py-2 text-sm hover:bg-blue-700 disabled:opacity-50"
              onClick={handleAddNew}
              disabled={value.Cases.length >= 10}
            >
              New Load
            </button>
            <button
              type="button"
              className="flex-1 rounded-md bg-gray-200 text-gray-800 px-3 py-2 text-sm hover:bg-gray-300 disabled:opacity-50"
              onClick={handleDeleteSelected}
              disabled={selectedIndex === null}
            >
              Delete
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="border rounded-md p-3">
          {selectedIndex === null || value.Cases.length === 0 ? (
            <p className="text-sm text-gray-500">Select a load to edit its details.</p>
          ) : (
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                  value={value.Cases[selectedIndex].Name}
                  onChange={(e) => {
                    const next = { ...value, Cases: [...value.Cases] };
                    next.Cases[selectedIndex] = { ...next.Cases[selectedIndex], Name: e.target.value };
                    onChange(next);
                  }}
                />
              </div>

              {/* Type radios (bound to PrimaryLoadCase.Type) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className={`px-3 py-2 rounded-md border ${value.Type === 'Strength' ? 'bg-blue-100 border-blue-400' : 'bg-white'}`}
                    onClick={() => onChange({ ...value, Type: 'Strength' })}
                  >
                    Strength Only
                  </button>
                  <button
                    type="button"
                    className={`px-3 py-2 rounded-md border ${value.Type === 'Serviceability' ? 'bg-blue-100 border-blue-400' : 'bg-white'}`}
                    onClick={() => onChange({ ...value, Type: 'Serviceability' })}
                  >
                    Serviceability
                  </button>
                </div>
              </div>

              {/* Deflection Limit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deflection Limit</label>
                <input
                  type="number"
                  className="w-40 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                  value={value.DeflectionLimit}
                  disabled={value.Type !== 'Serviceability'}
                  onChange={(e) => onChange({ ...value, DeflectionLimit: Number(e.target.value) })}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrimaryLoadCasesComponent;
