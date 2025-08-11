import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ProjectForm from '@/components/ProjectForm';
import PlanCanvas from '@/components/PlanCanvas';
import LoadCaseTypeSelector from '@/components/LoadCaseTypeSelector';
import PrimaryLoadCasesComponent from '@/components/PrimaryLoadCasesComponent';
import CombinedLoadCasesComponent from '@/components/CombinedLoadCasesComponent';
import NewPrimaryLoadCasesComponent from '@/components/NewPrimaryLoadCasesComponent';
import NewCombinedLoadCasesComponent from '@/components/NewCombinedLoadCasesComponent';
import type { Project } from '@/types';
import type { PrimaryLoadCase, CombinedLoadCase, LoadCase } from '@/types/loadCases';

const LoadCases: React.FC = () => {
  const [project, setProject] = useState<Project>({
    name: '',
    description: '',
  });

  // Selected load-case mode
  const [loadCaseType, setLoadCaseType] = useState<'PLC' | 'CLC'>('PLC');

  // Lists of load cases
  const [primaryLoadCases, setPrimaryLoadCases] = useState<PrimaryLoadCase[]>([]);
  const [combinedLoadCases, setCombinedLoadCases] = useState<CombinedLoadCase[]>([]);

  // Selected indices
  const [selectedPLCIndex, setSelectedPLCIndex] = useState<number | null>(null);
  const [selectedCLCIndex, setSelectedCLCIndex] = useState<number | null>(null);

  // Right panel editor mode
  const [rightEditorMode, setRightEditorMode] = useState<'plc' | 'clc' | null>(null);
  const [rightEditorPLC, setRightEditorPLC] = useState<PrimaryLoadCase | null>(null);
  const [rightEditorCLC, setRightEditorCLC] = useState<CombinedLoadCase | null>(null);

  // Optional: source list for building a CLC (can be fed from PLCs later)
  const [availablePrimaryLoads, setAvailablePrimaryLoads] = useState<LoadCase[]>([]);

  // Comments
  const [caseComments, setCaseComments] = useState<string>('');

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
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Load Cases</h2>

              {/* Load Case Type */}
              <LoadCaseTypeSelector
                value={loadCaseType}
                onChange={setLoadCaseType}
              />

              {/* PLC List (only when PLC selected) */}
              {loadCaseType === 'PLC' && (
                <div className="mt-6">
                  <PrimaryLoadCasesComponent
                    value={primaryLoadCases}
                    onChange={setPrimaryLoadCases}
                    selectedIndex={selectedPLCIndex}
                    onSelectionChange={setSelectedPLCIndex}
                    onNewRequested={(newPLC) => {
                      setRightEditorMode('plc');
                      setRightEditorPLC(newPLC);
                    }}
                  />
                </div>
              )}

              {/* CLC List (only when CLC selected) */}
              {loadCaseType === 'CLC' && (
                <div className="mt-6">
                  <CombinedLoadCasesComponent
                    value={combinedLoadCases}
                    onChange={setCombinedLoadCases}
                    selectedIndex={selectedCLCIndex}
                    onSelectionChange={setSelectedCLCIndex}
                    primaryLoadCases={availablePrimaryLoads}
                    onNewRequested={(newCLC) => {
                      setRightEditorMode('clc');
                      setRightEditorCLC(newCLC);
                    }}
                  />
                </div>
              )}

              {/* Comments */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comments
                </label>
                <textarea
                  className="w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 p-2 text-sm min-h-[120px]"
                  placeholder="Enter comments for this load case…"
                  value={caseComments}
                  onChange={(e) => setCaseComments(e.target.value)}
                />
              </div>

              {/* Back link */}
              <div className="mt-6">
                <Link
                  href="/project"
                  className="inline-flex items-center justify-center w-full rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  ← Return to Editing Spans
                </Link>
              </div>
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

            {/* Editor Panel */}
            {rightEditorMode === 'plc' && rightEditorPLC && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Edit Primary Load Case
                </h2>
                <NewPrimaryLoadCasesComponent
                  value={rightEditorPLC}
                  onChange={setRightEditorPLC}
                />
              </div>
            )}

            {rightEditorMode === 'clc' && rightEditorCLC && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Edit Combined Load Case
                </h2>
                <NewCombinedLoadCasesComponent
                  value={rightEditorCLC}
                  onChange={setRightEditorCLC}
                  primaryLoadCases={availablePrimaryLoads}
                />
              </div>
            )}
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
