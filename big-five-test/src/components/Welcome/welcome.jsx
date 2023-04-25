import React, { useState } from 'react';


export default function Welcome({ onPhaseChange }) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [code, setCode] = useState('');
  const [answers, setAnswers] = useState([]);

  const handleGetStarted = () => {
    setShowInstructions(true);
  };

  const handleBeginTest = () => {
    onPhaseChange('questions');
  };

  const handleCodeInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleViewResults = () => {
  const decodedResults = JSON.parse(atob(code));
  setAnswers(decodedResults);
  onPhaseChange('results', decodedResults);
};


  

  return (
    <section className="bg-gray-900 text-white h-full">
      <div
        className="mx-auto max-w-screen-2xl px-4 py-4 flex flex-col h-screen items-center"
      >
        <div className="mx-auto max-w-screen-xl text-center h-full flex flex-col flex-shrink justify-evenly items-center">
          {!showInstructions ? (
            <>
              <h1
                className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl p-5"
              >
                Welcome to the Big Five Personality Test
              </h1>

              <div className="flex flex-wrap justify-center gap-10 flex-col items-center w-9/12 lg:w-8/12">
                <p className="mt-4  sm:text-xl/relaxed">
                  Discover your personality traits by answering a series of questions
                  designed to analyze various aspects of your personality.
                </p>
                <button
                  onClick={handleGetStarted}
                  className="block w-3/4 rounded border border-blue-600 bg-blue-600 px-3 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                >
                  Get Started
                </button>
              </div>
              <div className="mt-12 w-full self-end">
                <p className="text-lg">Already completed the test? Enter your code to view your results:</p>
                <div className="mt-4 flex justify-center">
                  <input
                    type="text"
                    value={code}
                    onChange={handleCodeInputChange}
                    className="rounded-lg border-gray-300 shadow-sm w-1/2 px-3 py-2 text-lg text-black"
                    placeholder="Enter your code"
                  />
                  <button
                    onClick={handleViewResults}
                    className="ml-4 rounded border border-blue-600 bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                  >
                    View Results
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className='flex flex-col justify-evenly items-center h-1/2 '>
              <h1
                className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl p-5"
              >
                Instructions
              </h1>

              <div className="flex flex-wrap justify-center gap-10 flex-col items-center w-9/12 lg:w-8/12">
                <ul className=' flex flex-col space-y-5 items-center md:text-2xl'>
                  <li>There are 50 questions in this test.</li>
                  <li>For each question, rate the statement based on how accurately it describes you.</li>
                  <li>Please answer as honestly as possible to get the most accurate results.</li>
                  <li>There are no wrong answers.</li>
                </ul>
                <button
                  onClick={handleBeginTest}
                  className="block w-3/4 md:text-2xl rounded border border-blue-600 bg-blue-600 px-3 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                >
                  Take me to the test
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
