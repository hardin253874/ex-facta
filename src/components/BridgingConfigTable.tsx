import React from 'react';
import { BridgingSpacingInfo } from '@/types';

// BridgingConfigTable component for configuring bridging spacing per span with default toggle
interface BridgingConfigTableProps {
  numOfSpans: number;
  defaultSpacing: boolean;
  onDefaultSpacingChange: (value: boolean) => void;
  value: BridgingSpacingInfo[];
  onChange: (value: BridgingSpacingInfo[]) => void;
}

const BridgingConfigTable: React.FC<BridgingConfigTableProps> = ({
  numOfSpans,
  defaultSpacing,
  onDefaultSpacingChange,
  value,
  onChange,
}) => {
  const handleBridgingsChange = (index: number, newBridgings: number) => {
    const updatedValue = [...value];
    const currentItem = updatedValue[index] || {
      span: index + 1,
      bridgings: 0,
      field1: 0,
      field2: 0,
      field3: 0,
    };
    updatedValue[index] = {
      ...currentItem,
      bridgings: newBridgings,
      // Reset fields that are no longer needed
      field1: newBridgings >= 1 ? currentItem.field1 : 0,
      field2: newBridgings >= 2 ? currentItem.field2 : 0,
      field3: newBridgings >= 3 ? currentItem.field3 : 0,
    };
    onChange(updatedValue);
  };

  const handleFieldChange = (
    index: number,
    field: 'field1' | 'field2' | 'field3',
    newValue: number
  ) => {
    const updatedValue = [...value];
    const currentItem = updatedValue[index] || {
      span: index + 1,
      bridgings: 0,
      field1: 0,
      field2: 0,
      field3: 0,
    };
    updatedValue[index] = {
      ...currentItem,
      [field]: newValue,
    };
    onChange(updatedValue);
  };

  const bridgingOptions = [0, 1, 2, 3];

  return (
    <div className="space-y-4">
      {/* Default Bridging Spacing Toggle */}
      <div className="bg-gray-100 p-4 rounded">
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Default Bridging Spacing?
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="default-bridging-spacing"
              value="true"
              checked={defaultSpacing === true}
              onChange={() => onDefaultSpacingChange(true)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Yes</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="default-bridging-spacing"
              value="false"
              checked={defaultSpacing === false}
              onChange={() => onDefaultSpacingChange(false)}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">No</span>
          </label>
        </div>
      </div>

      {/* Bridging Configuration Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b border-gray-200 w-16">
                Span
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b border-gray-200 w-20">
                Bridgings
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b border-gray-200 w-20">
                Column 1
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b border-gray-200 w-20">
                Column 2
              </th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b border-gray-200 w-20">
                Column 3
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: numOfSpans }, (_, index) => {
              const bridgingInfo = value[index] || {
                span: index + 1,
                bridgings: 0,
                field1: 0,
                field2: 0,
                field3: 0,
              };

              return (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="px-4 py-2 border-b border-gray-200">
                    <span className="text-sm font-medium text-gray-700">
                      {bridgingInfo.span}
                    </span>
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    <select
                      value={bridgingInfo.bridgings}
                      onChange={e =>
                        handleBridgingsChange(index, parseInt(e.target.value))
                      }
                      disabled={defaultSpacing}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                      aria-label={`Bridgings for span ${bridgingInfo.span}`}
                      aria-disabled={defaultSpacing}
                    >
                      {bridgingOptions.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {bridgingInfo.bridgings >= 1 && (
                      <input
                        type="number"
                        step="0.01"
                        value={bridgingInfo.field1}
                        onChange={e =>
                          handleFieldChange(
                            index,
                            'field1',
                            parseFloat(e.target.value) || 0
                          )
                        }
                        disabled={defaultSpacing}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                        aria-label={`Column 1 for span ${bridgingInfo.span}`}
                        aria-disabled={defaultSpacing}
                      />
                    )}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {bridgingInfo.bridgings >= 2 && (
                      <input
                        type="number"
                        step="0.01"
                        value={bridgingInfo.field2}
                        onChange={e =>
                          handleFieldChange(
                            index,
                            'field2',
                            parseFloat(e.target.value) || 0
                          )
                        }
                        disabled={defaultSpacing}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                        aria-label={`Column 2 for span ${bridgingInfo.span}`}
                        aria-disabled={defaultSpacing}
                      />
                    )}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {bridgingInfo.bridgings >= 3 && (
                      <input
                        type="number"
                        step="0.01"
                        value={bridgingInfo.field3}
                        onChange={e =>
                          handleFieldChange(
                            index,
                            'field3',
                            parseFloat(e.target.value) || 0
                          )
                        }
                        disabled={defaultSpacing}
                        className="w-20 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                        aria-label={`Column 3 for span ${bridgingInfo.span}`}
                        aria-disabled={defaultSpacing}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BridgingConfigTable;
