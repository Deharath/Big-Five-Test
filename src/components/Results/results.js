// External dependencies
import React from 'react';
import { useState, useEffect, useContext, createContext } from 'react';
import { Buffer } from 'buffer';

// Internal dependencies
import MyBarChart from './BarChart.js';
import styles from './results.css';
import TraitDescriptions from '../../data/TraitDescriptions.json';

const Results = ({ answers, questions, onPhaseChange }) => {
    const PageContext = createContext();

    const PageProvider = ({ children }) => {
        const [page, setPage] = useState(0);

        return (
            <PageContext.Provider value={{ page, setPage }}>
                {children}
            </PageContext.Provider>
        );
    };

    const useLabels = () => {
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

        const isSmallScreen = windowSize < 700;
        return isSmallScreen
            ? ["O", "C", "E", "A", "N"]
            : ["Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Neuroticism"];
    };


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
        percentages[3] = 100 - percentages[3];
        return percentages;
    }
    const percentages = calculatePercentages(answers, questions);

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
                console.error('Failed to copy the code: ', err);
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
        const { setPage } = useContext(PageContext);
        const labels = useLabels();
        const data = [
            percentages[4].toFixed(0),
            percentages[2].toFixed(0),
            percentages[0].toFixed(0),
            percentages[1].toFixed(0),
            percentages[3].toFixed(0),
        ];
        return (
            <>
                <div className="flex flex-col items-center h-full w-full">
                    <MyBarChart data={data} labels={labels} onBarClickChangePage={setPage} />
                </div>
            </>
        );
    }

    function TraitDescriptionList() {
        const { page } = useContext(PageContext);

        if (page === 0) {
            return (
                <h2 className="font-bold lg:mb-5 text-2xl lg:text-4xl text-center">
                    Click on the bars for more info!
                </h2>
            );
        }

        const trait = TraitDescriptions[page - 1];
        const traitScore = percentages[trait.traitIndex];
        const descriptionIndex = Math.floor(traitScore / 20);

        return (
            <>
                <h2 className="font-bold lg:mb-5 text-center md:text-lg lg:text-3xl">
                    {trait.name}
                </h2>
                <p className="text-sm md:text-lg lg:text-xl text-justify">
                    {trait.descriptions[descriptionIndex]}
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
                        <PageProvider>
                            <div className="h-1/2 w-full items-center">
                                <PageOne />
                            </div>
                            <div className="flex flex-col py-2 md:py-4 lg:py-6 px-6 space-y-3 w-full h-1/2 items-center justify-center description">
                                <TraitDescriptionList />
                            </div>
                        </PageProvider>
                    </div>
                    <div className="bg-white rounded-b-xl">
                        <div className="flex items-center justify-center p-5 flex-col">
                            <button onClick={() => onPhaseChange('questionnaire')} className="text-gray-600 text-justify"> Take the test again</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Results;