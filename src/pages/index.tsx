import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Head>
        <title>Ex-Facta - Engineering Materials Selection Platform</title>
        <meta
          name="description"
          content="Select the best building materials and models for your engineering projects"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-center">
        <Link 
          href="/project"
          className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
        >
          Enter Projects
        </Link>
      </div>
    </div>
  );
};

export default Home;