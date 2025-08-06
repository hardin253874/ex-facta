import React from 'react';
import Head from 'next/head';

const Project: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Project - Ex-Facta</title>
        <meta name="description" content="Project page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="text-center py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Project Page
          </h1>
          <p className="text-gray-600">
            This is the project page. Content will be added here.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Project; 