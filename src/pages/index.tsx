import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import MaterialCard from '@/components/MaterialCard';
import ExampleChart from '@/components/charts/ExampleChart';
import { useMaterials } from '@/hooks/useMaterials';
import { ChartData } from '@/types';

const Home: React.FC = () => {
  const { materials, loading, error } = useMaterials();

  const chartData: ChartData[] = materials.map(material => ({
    label: material.name,
    value: material.sustainability.score,
    color: material.sustainability.score > 80 ? '#10b981' : material.sustainability.score > 60 ? '#f59e0b' : '#ef4444',
  }));

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-red-600">Error loading materials: {error}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Ex-Facta - Engineering Materials Selection Platform</title>
        <meta
          name="description"
          content="Select the best building materials and models for your engineering projects"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-secondary-900 mb-2">
            Welcome to Ex-Facta
          </h2>
          <p className="text-secondary-600 max-w-3xl">
            Discover and compare engineering materials for your next project.
            Our platform helps you make informed decisions based on real-world
            performance data, sustainability metrics, and cost analysis.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-secondary-900 mb-4">
            Material Sustainability Comparison
          </h3>
          <div className="bg-white rounded-lg shadow-sm p-6">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
              </div>
            ) : (
              <ExampleChart 
                data={chartData} 
                width={800} 
                height={400}
                margin={{ top: 20, right: 30, bottom: 60, left: 80 }}
              />
            )}
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-secondary-900">
              Featured Materials
            </h3>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm transition-colors">
              View All Materials
            </button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md border border-gray-200 p-6 animate-pulse"
                >
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map(material => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </div>
          )}
        </div>

        <div className="bg-primary-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-primary-900 mb-3">
            Why Choose Ex-Facta?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h4 className="font-medium text-primary-900 mb-1">
                Data-Driven Decisions
              </h4>
              <p className="text-sm text-primary-700">
                Make informed choices based on comprehensive material data and
                real-world performance metrics.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h4 className="font-medium text-primary-900 mb-1">
                Sustainability Focus
              </h4>
              <p className="text-sm text-primary-700">
                Prioritize environmentally responsible materials with detailed
                sustainability assessments.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 className="font-medium text-primary-900 mb-1">
                Expert Insights
              </h4>
              <p className="text-sm text-primary-700">
                Access curated material recommendations from industry experts
                and engineering professionals.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;