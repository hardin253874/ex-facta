// Component for building Combined Load Cases by selecting from Primary Load Cases with multipliers

import React, { useState, useEffect } from 'react';
import { CombinedLoadCase, LoadCase } from '../types/loadCases';

interface NewCombinedLoadCasesComponentProps {
  value: CombinedLoadCase;
  onChange: (updated: CombinedLoadCase) => void;
  primaryLoadCases: LoadCase[];
}

const NewCombinedLoadCasesComponent: React.FC<
  NewCombinedLoadCasesComponentProps
> = ({ value, onChange, primaryLoadCases }) => {
  const [leftSelectedIndex, setLeftSelectedIndex] = useState<number | null>(
    null
  );
  const [rightSelectedIndexes, setRightSelectedIndexes] = useState<number[]>(
    []
  );
  const [multiplier, setMultiplier] = useState<string>('1.0');

  // Auto-select first item in left list when not empty
  useEffect(() => {
    if (value.Cases.length > 0 && leftSelectedIndex === null) {
      setLeftSelectedIndex(0);
    } else if (value.Cases.length === 0) {
      setLeftSelectedIndex(null);
    } else if (
      leftSelectedIndex !== null &&
      leftSelectedIndex >= value.Cases.length
    ) {
      setLeftSelectedIndex(Math.max(0, value.Cases.length - 1));
    }
  }, [value.Cases.length, leftSelectedIndex]);

  const handleLeftSelection = (index: number) => {
    setLeftSelectedIndex(index);
  };

  const handleRightSelection = (index: number, isSelected: boolean) => {
    if (isSelected) {
      setRightSelectedIndexes(prev => [...prev, index]);
    } else {
      setRightSelectedIndexes(prev => prev.filter(i => i !== index));
    }
  };

  const handleMultiplierChange = (newMultiplier: string) => {
    setMultiplier(newMultiplier);
  };

  const handleAddLoad = () => {
    if (rightSelectedIndexes.length === 0 || value.Cases.length >= 10) return;

    const selectedPrimaryLoadCases = rightSelectedIndexes.map(
      index => primaryLoadCases[index]
    );

    const newLoadCases: LoadCase[] = [];
    const existingNames = new Set(value.Cases.map(c => c.Name));

    for (const selectedCase of selectedPrimaryLoadCases) {
      const newName = `${multiplier} * ${selectedCase.Name}`;
      // Skip duplicates
      if (!existingNames.has(newName)) {
        newLoadCases.push({
          Name: newName,
          LoadType: 'UDL',
          LoadDirection: '',
          LoadApplication: '',
          Units: '',
          Force: 0,
        });
        existingNames.add(newName);
        // Stop if we've reached max capacity
        if (value.Cases.length + newLoadCases.length >= 10) {
          break;
        }
      }
    }

    if (newLoadCases.length > 0) {
      const updatedCases = [...value.Cases, ...newLoadCases];
      const updatedCLC = { ...value, Cases: updatedCases };

      // Select the last added item
      setLeftSelectedIndex(updatedCases.length - 1);
      onChange(updatedCLC);
    }

    // Clear right selection after adding
    setRightSelectedIndexes([]);
  };

  const handleDelete = () => {
    if (leftSelectedIndex === null) return;

    const updatedCases = value.Cases.filter(
      (_, index) => index !== leftSelectedIndex
    );
    const updatedCLC = { ...value, Cases: updatedCases };

    // Update selected index after deletion
    if (updatedCases.length === 0) {
      setLeftSelectedIndex(null);
    } else if (leftSelectedIndex >= updatedCases.length) {
      setLeftSelectedIndex(updatedCases.length - 1);
    } else {
      setLeftSelectedIndex(Math.max(0, leftSelectedIndex - 1));
    }

    onChange(updatedCLC);
  };

  const isAddDisabled =
    rightSelectedIndexes.length === 0 || value.Cases.length >= 10;
  const isDeleteDisabled = leftSelectedIndex === null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Left List (Target - Combined Load Case) */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Loads in this Load Case (Max. 10)
        </label>
        <div
          role="listbox"
          className="h-64 overflow-auto border border-gray-300 rounded-md bg-white"
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
                aria-selected={leftSelectedIndex === index}
                onClick={() => handleLeftSelection(index)}
                className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                  leftSelectedIndex === index
                    ? 'bg-blue-100 border-l-4 border-blue-500'
                    : 'hover:bg-gray-50'
                }`}
              >
                {loadCase.Name}
              </div>
            ))
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleAddLoad}
            disabled={isAddDisabled}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              isAddDisabled
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
            }`}
          >
            Add Load
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleteDisabled}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              isDeleteDisabled
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
            }`}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Right List (Source - Primary Load Cases) */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Primary Load Cases
        </label>
        <div
          role="listbox"
          aria-multiselectable="true"
          className="h-64 overflow-auto border border-gray-300 rounded-md bg-white"
        >
          {primaryLoadCases.length === 0 ? (
            <div className="p-3 text-sm text-gray-500 text-center">
              No primary load cases available
            </div>
          ) : (
            primaryLoadCases.map((loadCase, index) => (
              <div
                key={index}
                role="option"
                aria-selected={rightSelectedIndexes.includes(index)}
                onClick={() =>
                  handleRightSelection(
                    index,
                    !rightSelectedIndexes.includes(index)
                  )
                }
                className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                  rightSelectedIndexes.includes(index)
                    ? 'bg-green-100 border-l-4 border-green-500'
                    : 'hover:bg-gray-50'
                }`}
              >
                {loadCase.Name}
              </div>
            ))
          )}
        </div>

        {/* Multiplier */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Multiplier:
          </label>
          <select
            value={multiplier}
            onChange={e => handleMultiplierChange(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="0.8">0.8</option>
            <option value="0.9">0.9</option>
            <option value="1.0">1.0</option>
            <option value="1.2">1.2</option>
            <option value="1.25">1.25</option>
            <option value="1.5">1.5</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default NewCombinedLoadCasesComponent;
