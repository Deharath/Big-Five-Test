import React from 'react';
import { useState } from 'react';
import styles from './questionnaire.css';
import MyBarChart from '../Results/BarChart.jsx';



export default function Questionnaire() {
    const questions = [
        { id: 1, text: "Am the life of the party.", aspect: 1, key: "+" },
        { id: 2, text: "Feel little concern for others.", aspect: 2, key: "-" },
        { id: 3, text: "Am always prepared.", aspect: 3, key: "+" },
        { id: 4, text: "Get stressed out easily.", aspect: 4, key: "-" },
        { id: 5, text: "Have a rich vocabulary.", aspect: 5, key: "+" },
        { id: 6, text: "Don't talk a lot.", aspect: 1, key: "-" },
        { id: 7, text: "Am interested in people.", aspect: 2, key: "+" },
        { id: 8, text: "Leave my belongings around.", aspect: 3, key: "-" },
        { id: 9, text: "Am relaxed most of the time.", aspect: 4, key: "+" },
        { id: 10, text: "Have difficulty understanding abstract ideas.", aspect: 5, key: "-" },
        { id: 11, text: "Feel comfortable around people.", aspect: 1, key: "+" },
        { id: 12, text: "Insult people.", aspect: 2, key: "-" },
        { id: 13, text: "Pay attention to details.", aspect: 3, key: "+" },
        { id: 14, text: "Worry about things.", aspect: 4, key: "-" },
        { id: 15, text: "Have a vivid imagination.", aspect: 5, key: "+" },
        { id: 16, text: "Keep in the background.", aspect: 1, key: "-" },
        { id: 17, text: "Sympathize with others' feelings.", aspect: 2, key: "+" },
        { id: 18, text: "Make a mess of things.", aspect: 3, key: "-" },
        { id: 19, text: "Seldom feel blue.", aspect: 4, key: "+" },
        { id: 20, text: "Am not interested in abstract ideas.", aspect: 5, key: "-" },
        { id: 21, text: "Start conversations.", aspect: 1, key: "+" },
        { id: 22, text: "Am not interested in other people's problems.", aspect: 2, key: "-" },
        { id: 23, text: "Get chores done right away.", aspect: 3, key: "+" },
        { id: 24, text: "Am easily disturbed.", aspect: 4, key: "-" },
        { id: 25, text: "Have excellent ideas.", aspect: 5, key: "+" },
        { id: 26, text: "Have little to say.", aspect: 1, key: "-" },
        { id: 27, text: "Have a soft heart.", aspect: 2, key: "+" },
        { id: 28, text: "Often forget to put things back in their proper place.", aspect: 3, key: "-" },
        { id: 29, text: "Get upset easily.", aspect: 4, key: "-" },
        { id: 30, text: "Do not have a good imagination.", aspect: 5, key: "-" },
        { id: 31, text: "Talk to a lot of different people at parties.", aspect: 1, key: "+" },
        { id: 32, text: "Am not really interested in others.", aspect: 2, key: "-" },
        { id: 33, text: "Like order.", aspect: 3, key: "+" },
        { id: 34, text: "Change my mood a lot.", aspect: 4, key: "-" },
        { id: 35, text: "Am quick to understand things.", aspect: 5, key: "+" },
        { id: 36, text: "Don't like to draw attention to myself.", aspect: 1, key: "-" },
        { id: 37, text: "Take time out for others.", aspect: 2, key: "+" },
        { id: 38, text: "Shirk my duties.", aspect: 3, key: "-" },
        { id: 39, text: "Have frequent mood swings.", aspect: 4, key: "-" },
        { id: 40, text: "Use difficult words.", aspect: 5, key: "+" },
        { id: 41, text: "Don't mind being the center of attention.", aspect: 1, key: "+" },
        { id: 42, text: "Feel others' emotions.", aspect: 2, key: "+" },
        { id: 43, text: "Follow a schedule.", aspect: 3, key: "+" },
        { id: 44, text: "Get irritated easily.", aspect: 4, key: "-" },
        { id: 45, text: "Spend time reflecting on things.", aspect: 5, key: "+" },
        { id: 46, text: "Am quiet around strangers.", aspect: 1, key: "-" },
        { id: 47, text: "Make people feel at ease.", aspect: 2, key: "+" },
        { id: 48, text: "Am exacting in my work.", aspect: 3, key: "+" },
        { id: 49, text: "Often feel blue.", aspect: 4, key: "-" },
        { id: 50, text: "Am full of ideas.", aspect: 5, key: "+" }
    ];

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

    //Function that will increase or decrease the score of given aspect based on the key of the question and move to the next one
    function onOptionSelect(value) {
        if (question.key === "+") {
            answers[question.aspect - 1] += value;
        } else {
            answers[question.aspect - 1] += (6 - value);
        }
        setAnswers(answers);
        setQuestion(questions[question.id]);
    }

    //Function that allows the user to go back to previous question
    function onBack() {
        if (question.id > 1) {
            const previousQuestion = questions[question.id - 2];
            const prevAnswer = question.key === "+" ? answers[previousQuestion.aspect - 1] - 1 : answers[previousQuestion.aspect - 1] - (6 - 1);

            const newAnswers = [...answers];
            newAnswers[previousQuestion.aspect - 1] = prevAnswer;
            setAnswers(newAnswers);

            setQuestion(previousQuestion);
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

    function Question({ question, onOptionSelect, onBack, questions }) {



        function Button({ value }) {
            return (
                <button onClick={() => onOptionSelect(value)} className="bg-gray-700 text-white px-4 py-2 rounded-lg justify-center">{value}</button>
            );
        }
        function BackButton() {
            return (
                <button onClick={() => onBack()} className="bg-gray-700 text-white px-4 py-2 rounded-lg mt-3">Back</button>
            );
        }

        return (
            <div className="bg-gray-900 text-white">
                <div className="mx-auto max-w-screen-xl px-4 flex h-screen items-center question">
                    <div className="mx-auto max-w-4xl text-center w-full px-4">
                        {question.id === questions.length - 1 ? (
                            <>
                                {(() => {
                                    const percentages = calculatePercentages(answers, questions);
                                    const labels = ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'];
                                    const data = [
                                        percentages[4].toFixed(2),
                                        percentages[2].toFixed(2),
                                        percentages[0].toFixed(2),
                                        percentages[1].toFixed(2),
                                        percentages[3] = 100 - percentages[3].toFixed(2),

                                    ];

                                    return (
                                        <>
                                            <div className="text-2xl font-bold mb-5 lg:text-5xl">Your score:</div>
                                            <MyBarChart data={data} labels={labels} />
                                        </>
                                    );
                                })()}
                            </>
                        ) : (
                            <>
                                <div className="relative flex flex-col justify-center items-center min-h-screen">
                                    <div className="absolute top-44 h-20 text-3xl font-bold lg:text-5xl px-4 text-center mb-5">
                                        {question.text}
                                    </div>
                                    <div className="flex flex-col items-center mt-20">
                                        <div className="flex flex-row justify-center items-center gap-5 mb-5">
                                            <Button value={1} />
                                            <Button value={2} />
                                            <Button value={3} />
                                            <Button value={4} />
                                            <Button value={5} />
                                        </div>
                                        <div className="flex justify-between w-full md:max-w-md">
                                            <span className="lg:text-2xl">Not accurate</span>
                                            <span className="lg:text-2xl">Very accurate</span>
                                        </div>
                                    </div>
                                    <BackButton />
                                </div>
                                
                            </>





                        )}
                    </div>
                </div>
            </div>

        );
    }
    return (
        <Question onBack={onBack} onOptionSelect={onOptionSelect} question={question} questions={questions} />
    );

};
