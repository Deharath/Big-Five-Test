import React from 'react';

export default function Welcome({ onButtonClick }) {
  return (
    <section class="bg-gray-900 text-white">
      <div
        class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center"
      >
        <div class="mx-auto max-w-3xl text-center">
          <h1
            class="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
          >
            Welcome to the Big Five Personality Test
          </h1>

          <p class="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Click the button below to start the questionnaire.
          </p>

          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onButtonClick('questions')}
              class="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"

            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>

  );
};
