import React from 'react';

export default function Welcome({ onPhaseChange }) {
  return (
    <section className="bg-gray-900 text-white h-full">
      <div
        className="mx-auto max-w-screen-xl px-4 py-32 flex h-screen items-center"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
          >
            Welcome to the Big Five Personality Test
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Click the button below to start the questionnaire.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onPhaseChange('questions')}
              className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>

  );
};
