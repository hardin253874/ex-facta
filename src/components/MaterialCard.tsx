import React from 'react';
import { Material } from '@/types';
import { formatCurrency } from '@/utils';

interface MaterialCardProps {
  material: Material;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-secondary-900">
          {material.name}
        </h3>
        <span className="inline-block bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full">
          {material.category}
        </span>
      </div>

      <p className="text-secondary-600 text-sm mb-4 line-clamp-2">
        {material.description}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-secondary-600">Cost per unit:</span>
          <span className="font-semibold text-secondary-900">
            {formatCurrency(material.cost)}
          </span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-secondary-600">Sustainability:</span>
          <div className="flex items-center">
            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${material.sustainability.score}%` }}
              />
            </div>
            <span className="text-xs text-secondary-700">
              {material.sustainability.score}%
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-secondary-900 mb-2">
          Key Properties:
        </h4>
        <div className="space-y-1">
          {material.properties.slice(0, 2).map((property, index) => (
            <div
              key={index}
              className="flex justify-between text-xs text-secondary-600"
            >
              <span>{property.name}:</span>
              <span>
                {property.value} {property.unit}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-medium text-secondary-900 mb-2">
          Use Cases:
        </h4>
        <div className="flex flex-wrap gap-1">
          {material.useCases.slice(0, 3).map((useCase, index) => (
            <span
              key={index}
              className="inline-block bg-secondary-100 text-secondary-700 text-xs px-2 py-1 rounded"
            >
              {useCase}
            </span>
          ))}
        </div>
      </div>

      <button className="w-full bg-primary-600 hover:bg-primary-700 text-white text-sm py-2 px-4 rounded-md transition-colors">
        View Details
      </button>
    </div>
  );
};

export default MaterialCard;
