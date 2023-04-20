import React from 'react';
import MyBarChart from './BarChart.jsx';


export default function Results({ answers, questions, onPhaseChange }) {

    //Function that returns the labels for the chart based on the screen size
    const getLabels = () => {
        const isSmallScreen = window.innerWidth < 768;
        return isSmallScreen
            ? ["O", "C", "E", "A", "N"]
            : ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Neuroticism"];
    };

    //Function that updates the labels when the screen size changes
    const [windowSize, setWindowSize] = React.useState(window.innerWidth);
    React.useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);



    //Function that calculates the percentages of each aspect
    function calculatePercentages(answers, questions) {
        const totalQuestionsPerAspect = []
        for (let i = 0; i < 5; i++) {
            totalQuestionsPerAspect.push(questions.filter(question => question.aspect === i + 1).length);
        }
        const minScorePerAspect = [...totalQuestionsPerAspect]
        const maxScorePerAspect = [...totalQuestionsPerAspect].map(total => total * 5);
        const scoreRangePerAspect = maxScorePerAspect.map((max, index) => max - minScorePerAspect[index]);
        const percentages = answers.map((answer, index) => ((answer - minScorePerAspect[index]) / scoreRangePerAspect[index]) * 100);

        return percentages;
    }

    return (
        /*
        <div className="bg-gray-900 text-white h-full w-full">
            <div
                className="mx-auto max-w-screen-xl px-4 py-32 flex h-screen items-center"
            >
                <div className="mx-auto w-full px-16 py-16 text-center">
                    <h1 className="mb-10 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
                        Your score:
                    </h1>

                    

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <button
                            
                            className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </div>
        */
        <div className="bg-gray-900 text-white h-full w-full flex justify-center items-center">
            <div class="py-3 sm:h-full sm:w-screen lg:w-3/4">
                <div class="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
                    <div class="px-12 py-5">
                        <h2 class="text-gray-800 text-3xl font-semibold justify-center flex">Your results: </h2>
                    </div>
                    <div class="bg-gray-200 w-full flex flex-col items-center">
                        <div class="flex flex-col items-center py-6 space-y-3 w-full">
                            {(() => {
                                const percentages = calculatePercentages(answers, questions);
                                const labels = getLabels();
                                const data = [
                                    percentages[4].toFixed(0),
                                    percentages[2].toFixed(0),
                                    percentages[0].toFixed(0),
                                    percentages[1].toFixed(0),
                                    percentages[3] = (100 - percentages[3]).toFixed(0),
                                ];

                                return (
                                    <>
                                        <MyBarChart data={data} labels={labels} />
                                    </>
                                );
                            })()}
                        </div>
                        <div class="w-full px-10 flex flex-row justify-around gap-10 mb-10">
                            <button class="my-3 text-md lg:text-xl bg-gradient-to-r from-purple-500 to-indigo-600 rounded-sm text-white p-2 flex-1">Previous section</button>
                            <button class="my-3 text-md lg:text-xl bg-gradient-to-r from-purple-500 to-indigo-600 rounded-sm text-white p-2 flex-1">Next section</button>
                        </div>

                    </div>
                    <div class="h-20 flex items-center justify-center">
                        <button onClick={() => onPhaseChange('questions')} className="text-gray-600"> Take the test again</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


