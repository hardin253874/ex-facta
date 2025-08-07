import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import ProjectForm from '@/components/ProjectForm';
import PlanCanvas from '@/components/PlanCanvas';
import PurlinTypeSelector from '@/components/PurlinTypeSelector';
import SpanTypeSelector, { SpanType } from '@/components/SpanTypeSelector';
import SpanNumberInput from '@/components/SpanNumberInput';
import PurlinSizeModeSelector from '@/components/PurlinSizeModeSelector';
import SheetingRestraintSelector from '@/components/SheetingRestraintSelector';
import SpanConfigTable from '@/components/SpanConfigTable';
import SupportConfigTable from '@/components/SupportConfigTable';
import BridgingConfigTable from '@/components/BridgingConfigTable';
import type {
  Project,
  SpanInfo,
  SupportInfo,
  BridgingSpacingInfo,
} from '@/types';

const Project: React.FC = () => {
  // State management
  const [project, setProject] = useState<Project>({
    name: '',
    description: '',
  });

  const [purlinType, setPurlinType] = useState<'typeC' | 'typeZ'>('typeC');
  const [spanType, setSpanType] = useState<SpanType>('spanType1');
  const [spanCount, setSpanCount] = useState<number>(0);
  const [purlinSizeMode, setPurlinSizeMode] = useState<
    'checkPurlinSize' | 'findPurlinSize'
  >('findPurlinSize');
  const [sheetingRestrained, setSheetingRestrained] = useState<boolean>(false);
  const [spanInfos, setSpanInfos] = useState<SpanInfo[]>([]);
  const [supportInfos, setSupportInfos] = useState<SupportInfo[]>([]);
  const [bridgingInfos, setBridgingInfos] = useState<BridgingSpacingInfo[]>([]);
  const [useDefaultSpacing, setUseDefaultSpacing] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Project - Ex-Facta</title>
        <meta name="description" content="Project configuration page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Panel */}
          <div className="md:w-1/4 space-y-4">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Configuration
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Purlin Type
                  </label>
                  <PurlinTypeSelector
                    value={purlinType}
                    onChange={setPurlinType}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Span Type
                  </label>
                  <SpanTypeSelector value={spanType} onChange={setSpanType} />
                </div>

                <div>
                  <SpanNumberInput value={spanCount} onChange={setSpanCount} />
                </div>

                {spanCount > 1 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Purlin Size Mode
                      </label>
                      <PurlinSizeModeSelector
                        value={purlinSizeMode}
                        onChange={setPurlinSizeMode}
                      />
                    </div>

                    <div>
                      <SheetingRestraintSelector
                        value={sheetingRestrained}
                        onChange={setSheetingRestrained}
                      />
                    </div>
                  </>
                )}
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

            {spanCount > 1 && (
              <>
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Span Configuration
                  </h2>
                  <SpanConfigTable
                    numOfSpans={spanCount}
                    purlinSizeMode={purlinSizeMode}
                    value={spanInfos}
                    onChange={setSpanInfos}
                  />
                </div>

                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Bridging Configuration
                  </h2>
                  <BridgingConfigTable
                    numOfSpans={spanCount}
                    defaultSpacing={useDefaultSpacing}
                    onDefaultSpacingChange={setUseDefaultSpacing}
                    value={bridgingInfos}
                    onChange={setBridgingInfos}
                  />
                </div>

                {purlinType === 'typeZ' && (
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      Support Configuration
                    </h2>
                    <SupportConfigTable
                      numOfSpans={spanCount}
                      spanType={spanType}
                      value={supportInfos}
                      onChange={setSupportInfos}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">
            Only applicable to Stramit Exacta® purlins and Stramit® bridging
          </p>
          <Link
            href="/loadCases"
            className="text-blue-600 underline cursor-pointer text-sm hover:text-blue-800 transition-colors"
          >
            Continue to Adding Load Cases
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Project;
