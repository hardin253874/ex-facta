import React from 'react';
import { SpanInfo } from '@/types';

// SpanConfigTable component for configuring span information in a table format
interface SpanConfigTableProps {
  numOfSpans: number;
  purlinSizeMode: 'checkPurlinSize' | 'findPurlinSize';
  value: SpanInfo[];
  onChange: (value: SpanInfo[]) => void;
}

const SpanConfigTable: React.FC<SpanConfigTableProps> = ({ 
  numOfSpans, 
  purlinSizeMode, 
  value, 
  onChange 
}) => {
  const handleLengthChange = (index: number, newLength: number) => {
    if (newLength > 0) {
      const updatedValue = [...value];
      updatedValue[index] = {
        ...updatedValue[index],
        length: newLength
      };
      onChange(updatedValue);
    }
  };

  const handlePurlinSizeChange = (index: number, newPurlinSize: string) => {
    const updatedValue = [...value];
    updatedValue[index] = {
      ...updatedValue[index],
      purlinSize: newPurlinSize
    };
    onChange(updatedValue);
  };

  const purlinSizeOptions = Array.from({ length: 10 }, (_, i) => `Size ${i + 1}`);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b border-gray-200">
              Span
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b border-gray-200">
              Length (mm)
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b border-gray-200">
              Purlin Size
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: numOfSpans }, (_, index) => {
            const spanInfo = value[index] || {
              span: index + 1,
              length: 0,
              purlinSize: 'Size 1'
            };
            
            return (
              <tr 
                key={index}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="px-4 py-2 border-b border-gray-200">
                  <span className="text-sm font-medium text-gray-700">
                    {spanInfo.span}
                  </span>
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  <input
                    type="number"
                    min="1"
                    value={spanInfo.length}
                    onChange={(e) => handleLengthChange(index, parseInt(e.target.value) || 0)}
                    className="w-24 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    aria-label={`Length for span ${spanInfo.span}`}
                  />
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  <select
                    value={spanInfo.purlinSize}
                    onChange={(e) => handlePurlinSizeChange(index, e.target.value)}
                    disabled={purlinSizeMode === 'findPurlinSize'}
                    className="w-24 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                    aria-label={`Purlin size for span ${spanInfo.span}`}
                  >
                    {purlinSizeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SpanConfigTable; 