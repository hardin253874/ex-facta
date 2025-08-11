// Component for managing the list of LoadCase items within a PrimaryLoadCase with single-select list and action buttons

import React, { useState, useEffect } from 'react';
import { PrimaryLoadCase, LoadCase } from '../types/loadCases';

export interface NewPrimaryLoadCasesComponentProps {
  value: PrimaryLoadCase;
  onChange: (updated: PrimaryLoadCase) => void;
  selectedIndex?: number | null;
  onSelectIndex?: (index: number | null) => void;
  onAddAxialRequested?: (selectedIndex: number) => void;
  onEditMovingRequested?: (selectedIndex: number) => void;
}

const NewPrimaryLoadCasesComponent: React.FC<
  NewPrimaryLoadCasesComponentProps
> = ({ value, onChange, selectedIndex: externalSelectedIndex, onSelectIndex, onAddAxialRequested, onEditMovingRequested }) => {
  const [internalSelectedIndex, setInternalSelectedIndex] = useState<number | null>(null);
  
  // Use external selection if provided, otherwise use internal
  const selectedIndex = externalSelectedIndex !== undefined ? externalSelectedIndex : internalSelectedIndex;
  const setSelectedIndex = onSelectIndex || setInternalSelectedIndex;

  // Auto-select first item when list is not empty
  useEffect(() => {
    if (value.Cases.length > 0 && selectedIndex === null) {
      setSelectedIndex(0);
    } else if (value.Cases.length === 0) {
      setSelectedIndex(null);
    } else if (selectedIndex !== null && selectedIndex >= value.Cases.length) {
      setSelectedIndex(Math.max(0, value.Cases.length - 1));
    }
  }, [value.Cases.length, selectedIndex]);

  const handleNewLoad = () => {
    if (value.Cases.length >= 10) return;

    const newLoadCase: LoadCase = {
      Name: `Load ${value.Cases.length + 1}`,
      LoadType: 'UDL',
      LoadDirection: '',
      LoadApplication: '',
      Units: '',
      Force: 0,
    };

    const updatedCases = [...value.Cases, newLoadCase];
    const updatedPrimary = { ...value, Cases: updatedCases };
    setSelectedIndex(updatedCases.length - 1);
    onChange(updatedPrimary);
  };

  const handleDelete = () => {
    if (selectedIndex === null) return;

    const updatedCases = value.Cases.filter(
      (_, index) => index !== selectedIndex
    );
    const updatedPrimary = { ...value, Cases: updatedCases };

    // Update selected index after deletion
    if (updatedCases.length === 0) {
      setSelectedIndex(null);
    } else if (selectedIndex >= updatedCases.length) {
      setSelectedIndex(updatedCases.length - 1);
    } else {
      setSelectedIndex(Math.max(0, selectedIndex - 1));
    }

    onChange(updatedPrimary);
  };

  const handleAddAxialLoad = () => {
    if (selectedIndex !== null) {
      onAddAxialRequested?.(selectedIndex);
    }
  };

  const handleEditMovingLoad = () => {
    if (selectedIndex !== null) {
      onEditMovingRequested?.(selectedIndex);
    }
  };

  const handleSelectionChange = (index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="space-y-3">
      {/* Listbox */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Loads in this Load Case (Max. 10)
        </label>
        <div
          role="listbox"
          className="h-40 overflow-auto border border-gray-300 rounded-md bg-white"
        >
          {value.Cases.length === 0 ? (
            <div className="p-3 text-sm text-gray-500 text-center">
              No loads added yet
            </div>
          ) : (
            value.Cases.map((loadCase, index) => (
              <div
                key={index}
                role="option"
                aria-selected={selectedIndex === index}
                onClick={() => handleSelectionChange(index)}
                className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                  selectedIndex === index
                    ? 'bg-blue-100 border-l-4 border-blue-500'
                    : 'hover:bg-gray-50'
                }`}
              >
                {loadCase.Name}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        {/* Row 1: New Load and Delete */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleNewLoad}
            disabled={value.Cases.length >= 10}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              value.Cases.length >= 10
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            }`}
          >
            New Load
          </button>
          <button
            onClick={handleDelete}
            disabled={selectedIndex === null}
            className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              selectedIndex === null
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500'
            }`}
          >
            Delete
          </button>
        </div>

        {/* Row 2: Add Axial Load */}
        <button
          type="button"
          onClick={handleAddAxialLoad}
          disabled={selectedIndex === null}
          className={`w-full px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
            selectedIndex === null
              ? 'text-gray-400 bg-gray-200 border-gray-300 cursor-not-allowed'
              : 'text-blue-700 bg-white border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
          }`}
        >
          Add Axial Load
        </button>

        {/* Row 3: Edit Moving Load */}
        <button
          type="button"
          onClick={handleEditMovingLoad}
          disabled={selectedIndex === null}
          className={`w-full px-3 py-2 text-sm font-medium rounded-md border transition-colors ${
            selectedIndex === null
              ? 'text-gray-400 bg-gray-200 border-gray-300 cursor-not-allowed'
              : 'text-blue-700 bg-white border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500'
          }`}
        >
          Edit Moving Load
        </button>
      </div>
    </div>
  );
};

export default NewPrimaryLoadCasesComponent;
