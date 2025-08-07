import React from 'react';
import { SupportInfo } from '@/types';

// SupportConfigTable component for configuring support information in a table format
interface SupportConfigTableProps {
  numOfSpans: number;
  spanType: string;
  value: SupportInfo[];
  onChange: (value: SupportInfo[]) => void;
}

const SupportConfigTable: React.FC<SupportConfigTableProps> = ({
  numOfSpans,
  value,
  onChange,
}) => {
  const handleLapChange = (index: number, newLap: boolean) => {
    const updatedValue = [...value];
    updatedValue[index] = {
      ...updatedValue[index],
      lap: newLap,
      // Reset percentages when lap is set to false
      leftPercentage: newLap ? updatedValue[index].leftPercentage : 0,
      rightPercentage: newLap ? updatedValue[index].rightPercentage : 0,
    };
    onChange(updatedValue);
  };

  const handlePercentageChange = (
    index: number,
    field: 'leftPercentage' | 'rightPercentage',
    newValue: number
  ) => {
    // Validate percentage is between 0 and 100
    if (newValue >= 0 && newValue <= 100) {
      const updatedValue = [...value];
      updatedValue[index] = {
        ...updatedValue[index],
        [field]: newValue,
      };
      onChange(updatedValue);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b border-gray-200 w-16">
              Support
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b border-gray-200 w-16">
              Lap
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b border-gray-200 w-24">
              Left %
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b border-gray-200 w-24">
              Right %
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: numOfSpans }, (_, index) => {
            const supportInfo = value[index] || {
              support: index + 1,
              lap: false,
              leftPercentage: 0,
              rightPercentage: 0,
            };

            const isFixRow = index === 0;
            const isLapEnabled = supportInfo.lap;

            return (
              <tr
                key={index}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-4 py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-700">
                    {supportInfo.support}
                  </span>
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  <select
                    value={supportInfo.lap ? 'Y' : 'N'}
                    onChange={e =>
                      handleLapChange(index, e.target.value === 'Y')
                    }
                    disabled={isFixRow}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                    aria-label={`Lap for support ${supportInfo.support}`}
                    aria-disabled={isFixRow}
                  >
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                  </select>
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={supportInfo.leftPercentage}
                    onChange={e =>
                      handlePercentageChange(
                        index,
                        'leftPercentage',
                        parseFloat(e.target.value) || 0
                      )
                    }
                    disabled={!isLapEnabled || isFixRow}
                    className="w-24 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                    aria-label={`Left percentage for support ${supportInfo.support}`}
                    aria-disabled={!isLapEnabled || isFixRow}
                  />
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={supportInfo.rightPercentage}
                    onChange={e =>
                      handlePercentageChange(
                        index,
                        'rightPercentage',
                        parseFloat(e.target.value) || 0
                      )
                    }
                    disabled={!isLapEnabled || isFixRow}
                    className="w-24 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                    aria-label={`Right percentage for support ${supportInfo.support}`}
                    aria-disabled={!isLapEnabled || isFixRow}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SupportConfigTable;
