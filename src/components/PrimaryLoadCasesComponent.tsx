import React from 'react';
import type { PrimaryLoadCase } from '@/types/loadCases';

interface PrimaryLoadCasesComponentProps {
  value: PrimaryLoadCase[];
  onChange: (value: PrimaryLoadCase[]) => void;
  onNewRequested?: (newPLC: PrimaryLoadCase) => void;
  selectedIndex: number | null;
  onSelectionChange: (index: number | null) => void;
}

const PrimaryLoadCasesComponent: React.FC<PrimaryLoadCasesComponentProps> = ({
  value,
  onChange,
  onNewRequested,
  selectedIndex,
  onSelectionChange,
}) => {
  // Add new PLC
  const handleAddNew = () => {
    if (value.length >= 20) return;
    const newPLC: PrimaryLoadCase = {
      Name: `P. Load Case ${value.length + 1}`,
      Cases: [],
      Type: 'Strength',
      DeflectionLimit: 0,
    };
    const updatedPLCs = [...value, newPLC];
    onChange(updatedPLCs);
    onSelectionChange(updatedPLCs.length - 1);
    onNewRequested?.(newPLC);
  };

  // Delete selected PLC
  const handleDeleteSelected = () => {
    if (selectedIndex === null) return;
    const updatedPLCs = value.filter((_, idx) => idx !== selectedIndex);
    onChange(updatedPLCs);
    onSelectionChange(
      updatedPLCs.length === 0 ? null : Math.max(0, selectedIndex - 1)
    );
  };

  return (
    <div className="space-y-2">
      <h3 className="text-base font-semibold text-gray-900">
        Primary Load Cases (Max. 20)
      </h3>

      <div className="space-y-4">
        <div className="border rounded-md">
          <select
            className="w-full h-56 p-2 outline-none"
            size={10}
            value={selectedIndex ?? -1}
            onChange={e =>
              onSelectionChange(
                e.target.value === '-1' ? null : Number(e.target.value)
              )
            }
          >
            {value.map((plc, i) => (
              <option key={i} value={i}>
                {plc.Name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="flex-1 rounded-md bg-blue-600 text-white px-3 py-2 text-sm hover:bg-blue-700 disabled:opacity-50"
            onClick={handleAddNew}
            disabled={value.length >= 20}
          >
            New PLC
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

        {/* PLC Details */}
        {selectedIndex !== null && value[selectedIndex] && (
          <div className="border rounded-md p-3 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500"
                value={value[selectedIndex].Name}
                onChange={e => {
                  const updatedPLCs = [...value];
                  updatedPLCs[selectedIndex] = {
                    ...updatedPLCs[selectedIndex],
                    Name: e.target.value,
                  };
                  onChange(updatedPLCs);
                }}
              />
            </div>

            {/* Type radios */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  className={`px-3 py-2 rounded-md border ${value[selectedIndex].Type === 'Strength' ? 'bg-blue-100 border-blue-400' : 'bg-white'}`}
                  onClick={() => {
                    const updatedPLCs = [...value];
                    updatedPLCs[selectedIndex] = {
                      ...updatedPLCs[selectedIndex],
                      Type: 'Strength',
                    };
                    onChange(updatedPLCs);
                  }}
                >
                  Strength Only
                </button>
                <button
                  type="button"
                  className={`px-3 py-2 rounded-md border ${value[selectedIndex].Type === 'Serviceability' ? 'bg-blue-100 border-blue-400' : 'bg-white'}`}
                  onClick={() => {
                    const updatedPLCs = [...value];
                    updatedPLCs[selectedIndex] = {
                      ...updatedPLCs[selectedIndex],
                      Type: 'Serviceability',
                    };
                    onChange(updatedPLCs);
                  }}
                >
                  Serviceability
                </button>
              </div>
            </div>

            {/* Deflection Limit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Deflection Limit
              </label>
              <input
                type="number"
                className="w-40 rounded-md border-gray-300 focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                value={value[selectedIndex].DeflectionLimit}
                disabled={value[selectedIndex].Type !== 'Serviceability'}
                onChange={e => {
                  const updatedPLCs = [...value];
                  updatedPLCs[selectedIndex] = {
                    ...updatedPLCs[selectedIndex],
                    DeflectionLimit: Number(e.target.value),
                  };
                  onChange(updatedPLCs);
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrimaryLoadCasesComponent;
