import React, { useState } from 'react';
import styles from './questionnaire.css';


const Questionnaire = ({ onPhaseChange, questions }) => {

    //Aspect 1: Extraversion (E)
    //Aspect 2: Agreeableness (A)
    //Aspect 3: Conscientiousness (C)
    //Aspect 4: Neuroticism (N)
    //Aspect 5: Openness to Experience (O)

    /* 
    For + keyed items, the response "Very Inaccurate" is assigned a value of 1, "Moderately Inaccurate" a value of 2, "Neither Inaccurate nor Accurate" a 3, "Moderately Accurate" a 4, and "Very Accurate" a value of 5.
    For - keyed items, the response "Very Inaccurate" is assigned a value of 5, "Moderately Inaccurate" a value of 4, "Neither Inaccurate nor Accurate" a 3, "Moderately Accurate" a 2, and "Very Accurate" a value of 1.
    Once numbers are assigned for all of the items in the scale, just sum all the values to obtain a total scale score.
    */

    //State that will hold the answers to the questions
    const [answers, setAnswers] = useState([0, 0, 0, 0, 0]);

    //State that will hold the current question
    const [question, setQuestion] = useState(questions[0]);

    //State that will hold which of the buttons was clicked
    const [clicked, setClicked] = useState(false);

    //State that will hold the direction of the animation
    const [direction, setDirection] = useState('forward');

    // State that will hold the clicked values for each question
    const [clickedValues, setClickedValues] = useState(Array(questions.length).fill(null));



    function Question({ questions }) {

        function ProgressBar({ currentQuestion, totalQuestions, direction }) {
            const progressPercentage = (currentQuestion / totalQuestions) * 100;
            const previousPercentage = ((currentQuestion - (direction === 'forward' ? 1 : -1)) / totalQuestions) * 100;

            // Create a unique keyframes animation for each progress update
            const progressBarAnimation = `@keyframes progress-bar-animation-${currentQuestion} {
              0% {
                width: ${previousPercentage}%;
              }
              100% {
                width: ${progressPercentage}%;
              }
            }`;

            return (
                <div className="w-full bg-gray-300 h-2 rounded">
                    <style>{progressBarAnimation}</style>
                    <div
                        className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full rounded"
                        style={{
                            width: `${progressPercentage}%`,
                            animation: `progress-bar-animation-${currentQuestion} linear 0.1s forwards`,
                        }}
                    ></div>
                </div>
            );
        }

        //Function that will render the buttons
        function Buttons() {
            const values = [1, 2, 3, 4, 5];

            //Function that will handle the click on the buttons
            function onOptionSelect(value) {
                const newAnswers = [...answers];
                newAnswers[question.aspect - 1] += question.key === "+" ? value : (6 - value);
                setAnswers(newAnswers);
                setQuestion(questions[question.id]);
                setClicked(value);
            
                const newClickedValues = [...clickedValues];
                newClickedValues[question.id - 1] = value;
                setClickedValues(newClickedValues);
            
                setDirection('forward');
                if (question.id === questions.length) {
                    onPhaseChange('results', newAnswers)
                }
            }
            

            return (
                <>
                    {values.map(value => (
                        <button
                            key={value}
                            onClick={() => onOptionSelect(value)}
                            className={`${clicked === value && "button-animation"} text-white p-5 rounded-full justify-center h-1/5 bg-gray-700 border-2 border-gray-700 hover:bg-gray-600 hover:border-gray-600`}
                        >
                        </button>
                    ))}

                </>
            );
        }

        //Function that allows the user to go back to previous question
        function BackButton() {
            function onBack() {
                if (question.id > 1) {
                    const previousQuestion = questions[question.id - 2];
                    const prevValue = clickedValues[previousQuestion.id - 1];
                    const prevAnswer = previousQuestion.key === "+" ? answers[previousQuestion.aspect - 1] - prevValue : answers[previousQuestion.aspect - 1] - (6 - prevValue);
                    const newAnswers = [...answers];
                    newAnswers[previousQuestion.aspect - 1] = prevAnswer;
                    setAnswers(newAnswers);
            
                    const newClickedValues = [...clickedValues];
                    newClickedValues[previousQuestion.id - 1] = null;
                    setClickedValues(newClickedValues);
            
                    setClicked(newClickedValues[previousQuestion.id - 2]);
                    setDirection('backward');
                    setQuestion(previousQuestion);
                } else {
                    onPhaseChange('welcome');
                }
            }
            


            return (
                <div className="w-3/4 flex flex-col">
                    <button onClick={() => onBack()} className="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white">Back</button>
                </div>
            );
        }

        //Function that allows the user to skip the test and go to the results, for testing purposes
        function SkipButton() {
            const handleSkip = () => {
                const newAnswers = [50, 50, 50, 50, 50];
                setAnswers(newAnswers);
                onPhaseChange('results', newAnswers);
            };

            return (
                <button
                    className="py-3 w-20 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white"
                    onClick={handleSkip}
                >
                    Skip
                </button>
            );
        }


        return (
            <div className="bg-gray-900 text-white">
                <div className="mx-auto max-w-screen-xl px-4 flex h-screen items-center">
                    <div className="mx-auto max-w-4xl text-center w-full px-4">
                        <div className="py-3 sm:mx-auto">
                            <div className="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg lg:w-8/12 m-auto">
                                <div className="px-5 py-2 h-24 lg:h-28">
                                    <span className='text-black'>{`${question.id} / ${questions.length}`}</span>
                                    <h2 className="text-gray-800 text-xl md:text-3xl font-semibold question">{question.text}{console.log(answers)}</h2>
                                </div>
                                <ProgressBar currentQuestion={question.id} totalQuestions={questions.length + 1} direction={direction} />
                                <div className="bg-gray-200 rounded-xl w-full flex flex-col items-center">
                                    <div className="flex flex-col items-center p-6  space-y-3 min-w-full">
                                        <div className="flex flex-col items-center px-2 py-2 w-full">
                                            <div className="flex flex-col">
                                                <div className='flex flex-row space-x-3 sm:space-x-2 mb-2 sm:mb-0 py-5'>
                                                    <Buttons />
                                                </div>
                                                <div className="flex w-full justify-between mt-2">
                                                    <span className="text-lg text-gray-800">Inaccurate</span>
                                                    <span className="text-lg text-gray-800">Accurate</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <BackButton />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
    return (
        <Question question={question} questions={questions} />
    );

};
export default Questionnaire;
