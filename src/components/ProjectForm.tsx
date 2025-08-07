import React from 'react';
import { Project } from '@/types';

// ProjectForm component for editing project name and description
interface ProjectFormProps {
  value: Project;
  onChange: (project: Project) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ value, onChange }) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      name: e.target.value,
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...value,
      description: e.target.value,
    });
  };

  return (
    <div className="flex flex-row gap-4 items-center">
      <div className="flex flex-col">
        <label
          htmlFor="project-name"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Project:
        </label>
        <input
          id="project-name"
          type="text"
          value={value.name}
          onChange={handleNameChange}
          className="w-64 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="project-description"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description:
        </label>
        <input
          id="project-description"
          type="text"
          value={value.description}
          onChange={handleDescriptionChange}
          className="w-64 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default ProjectForm;
