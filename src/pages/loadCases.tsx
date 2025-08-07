import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ProjectForm from '@/components/ProjectForm';
import PlanCanvas from '@/components/PlanCanvas';
import type { Project } from '@/types';

const LoadCases: React.FC = () => {
  const [project, setProject] = useState<Project>({
    name: '',
    description: '',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Load Cases - Ex-Facta</title>
        <meta name="description" content="Load case configuration page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Panel */}
          <div className="md:w-1/4 space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Load Case Settings
              </h2>

              {/* 🔧 Placeholder: Replace with LoadCaseTypeSelector, PLCListManager, etc. */}
              <p className="text-sm text-gray-500">
                Load case configuration controls will go here.
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="md:w-3/4 space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Project Details
              </h2>
              <ProjectForm value={project} onChange={setProject} />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Plan View
              </h2>
              <PlanCanvas />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-between">
          <Link
            href="/project"
            className="text-blue-600 underline text-sm hover:text-blue-800"
          >
            ← Return to Editing Spans
          </Link>

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition"
            disabled
          >
            Calculate
          </button>
        </div>
      </main>
    </div>
  );
};

export default LoadCases;
