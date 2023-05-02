import React from 'react';
import MyBarChart from './BarChart.js';
import { useState, useEffect } from 'react';
import styles from './results.css';
import { Buffer } from 'buffer';
import TraitDescriptions from '../../data/TraitDescriptions.json';

export default function Results({ answers, questions, onPhaseChange }) {

    //Function that returns the labels for the chart based on the screen size
    const getLabels = () => {
        const isSmallScreen = window.innerWidth < 700;
        return isSmallScreen
            ? ["O", "C", "E", "A", "N"]
            : ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Neuroticism"];
    };

    //Function that updates the labels when the screen size changes
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = () => {
            setWindowSize(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    //Function that changes the pages of results to next or previous
    const [page, setPage] = useState(0);
    const handlePageChange = (direction) => {
        if (direction === 'next') {
            if (page < 5) {
                setPage(page + 1);
            }
        } else {
            if (page > 0) {
                setPage(page - 1);
            }
        }
    }

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

    //Component rendering the code to save the results
    function ResultsCode() {
        const encodedResults = (results) => {
            return Buffer.from(JSON.stringify(results)).toString('base64');
        };

        const [copySuccess, setCopySuccess] = useState(false);
        const handleCopyCode = async () => {
            try {
                await navigator.clipboard.writeText(encodedResults(answers));
                setCopySuccess(true);
            } catch (err) {

            }
        };

        return (
            <div className="flex flex-col text-xs justify-center">
                <h3 className="font-semibold text-gray-800 mb-2">
                    Save your results by copying this code:
                </h3>
                <p
                    onClick={() => { handleCopyCode(); setTimeout(() => setCopySuccess(false), 2000) }}
                    className="font-semibold text-gray-800 bg-gray-100 p-2 rounded cursor-pointer text-center">
                    {copySuccess ? 'Copied!' : encodedResults(answers)}
                </p>
            </div>
        )
    }

    function PageOne() {
        return (
            <>
                <div className="flex flex-col items-center h-full w-full">
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
                    })()
                    }
                </div>
            </>
        );
    }


    function TraitSection({ traitName, descriptions, traitIndex }) {
        const percentages = calculatePercentages(answers, questions);
        const traitScore = percentages[traitIndex];
        let descriptionIndex;
        if (traitScore >= 80) {
            descriptionIndex = 4;
        } else if (traitScore >= 60) {
            descriptionIndex = 3;
        } else if (traitScore >= 40) {
            descriptionIndex = 2;
        } else if (traitScore >= 20) {
            descriptionIndex = 1;
        } else {
            descriptionIndex = 0;
        }
        return (
            <>
                <h2 className="font-bold lg:mb-5 text-center">{traitName}</h2>
                <p className="text-sm text-justify">
                    {descriptions[descriptionIndex]}
                </p>
            </>
        );
    }


    return (
        <div className="bg-gray-900 text-white h-screen w-full flex justify-center items-center flex-col">
            <div className="rounded-xl h-screen w-11/12 lg:w-3/4 flex-1">
                <div className=" flex flex-col shadow-lg w-full h-full justify-center">
                    <div className="px-12 py-5 bg-white rounded-t-xl">
                        <h2 className="text-gray-800 text-3xl font-semibold justify-center flex"><ResultsCode /></h2>
                    </div>
                    <div className="bg-gray-200 w-full flex flex-col items-center h-4/6 text-black px-5 justify-around">
                        {
                            <div className="h-1/2 w-full items-center">
                                <PageOne answers={answers} questions={questions} />
                            </div>

                        }
                        {TraitDescriptions.map((trait, index) => {
                            if (page === index + 1) {
                                return (
                                    <div className="flex flex-col py-2 md:py-4 lg:py-6 px-6 space-y-3 w-full h-1/2 items-center description">
                                        <TraitSection
                                            key={trait.name}
                                            traitName={trait.name}
                                            descriptions={trait.descriptions}
                                            traitIndex={trait.traitIndex}
                                        />
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                    <div className="w-full px-3 hidden flex-row justify-around gap-5 items-end border-b-4 bg-gray-200">
                        {page !== 0 && <button onClick={() => handlePageChange('previous')} className="my-3 text-md lg:text-xl bg-gradient-to-r from-purple-500 to-indigo-600 rounded-sm text-white flex-1 w-1/5 py-2 lg:max-w-[30%]">Previous section</button>}
                        {page !== 5 && <button onClick={() => handlePageChange('next')} className="my-3 text-md lg:text-xl bg-gradient-to-r from-purple-500 to-indigo-600 rounded-sm text-white flex-1 w-1/5 py-2 lg:max-w-[30%]">Next section</button>}
                    </div>
                    <div className="bg-white rounded-b-xl">
                        <div className="flex items-center justify-center p-5 flex-col">
                            <button onClick={() => onPhaseChange('questionnaire')} className="text-gray-600 text-justify"> Take the test again</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}