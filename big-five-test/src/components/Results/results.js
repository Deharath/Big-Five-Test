import React from 'react';
import MyBarChart from './BarChart.js';
import { useState } from 'react';
import styles from './results.css';

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

    //Function that changes the pages of results to next or previous
    const [page, setPage] = React.useState(0);
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
    function CodeComponent() {
        const encodedResults = (results) => {
            return btoa(JSON.stringify(results));
        }
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
                <div className="flex flex-col items-center h-3/6 md:h-4/6 lg:h-5/6 w-full">
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
                                <CodeComponent />
                                <MyBarChart data={data} labels={labels} />
                            </>
                        );

                    })()
                    }
                </div>
                <h3 className="text-gray-800 text-lg lg:text-xl font-semibold justify-center flex bg-gray-200 text-center"> What those scores mean? Look through the other sections! </h3>
            </>
        );
    }

    const traits = [
        {
            name: "Openness",
            descriptions: [
                "You display a low level of openness, meaning you tend to be practical, down-to-earth, and prefer routine over novelty. You appreciate tradition and are more comfortable with familiar environments. While this might make you a reliable and consistent individual, you may benefit from occasionally stepping out of your comfort zone to explore new experiences and ideas.",
                "Your openness score is slightly below average, indicating a preference for stability and familiarity. You tend to be more practical and focused on the present, with a moderate appetite for novelty and new experiences. While you may not be the most adventurous person, you can still adapt to change when necessary. Embracing new experiences and ideas from time to time can help broaden your perspective and enrich your life.",
                "You exhibit an average level of openness, striking a balance between embracing new experiences and maintaining a sense of stability. You can appreciate both traditional and unconventional ideas, and you're generally open to exploring new possibilities. This balance makes you a versatile individual who can adapt to different environments and situations.",
                "Your openness score is high, which means you're intellectually curious, imaginative, and enjoy exploring new ideas and experiences. You appreciate art, beauty, and unconventional perspectives. This creativity and open-mindedness make you a valuable team member, as you're likely to come up with innovative solutions and embrace change with enthusiasm. Continue to nurture your curiosity and seek out opportunities for growth and learning.",
                "You possess an exceptionally high level of openness, reflecting a strong passion for novelty, intellectual curiosity, and creativity. You're likely to thrive in environments that promote innovation and change, as you're always eager to explore new perspectives and challenge the status quo. Your imaginative and inventive nature makes you an asset in any team, as you bring fresh ideas and a willingness to push boundaries. Be sure to leverage your openness to foster a growth mindset and embrace lifelong learning."
            ],
            traitIndex: 4,
        },
        {
            name: "Conscientiousness",
            descriptions: [
                "You have a low conscientiousness score, which means you might be more spontaneous and carefree than others. You likely prefer going with the flow over detailed planning. Embrace your free spirit, but consider incorporating some organization to achieve a more balanced approach.",
                "Your conscientiousness score is somewhat below average, suggesting that you're more flexible and easygoing. While this can be a strength, it might also result in occasional lapses in focus. To sharpen your organizational skills, try setting smaller, achievable goals to build up your confidence and reliability.",
                "You have an average level of conscientiousness, demonstrating a balance between organization and adaptability. You're capable of planning and meeting deadlines but also know when to go with the flow. Keep refining your skills to enhance your effectiveness in various situations.",
                "Your high conscientiousness score shows that you're organized, responsible, and goal-driven. You excel at planning and keeping track of deadlines, making you dependable and trustworthy. Just remember to embrace spontaneity from time to time and stay open to new experiences.",
                "With an exceptionally high conscientiousness score, you exhibit remarkable self-discipline, organization, and goal-oriented behavior. Your dedication to order makes you a reliable individual. To keep your life dynamic, don't forget to seek balance by embracing change and exploring new opportunities."
            ],
            traitIndex: 2,
        },
        {
            name: "Extraversion",
            descriptions: [
                "With a low extraversion score, you are likely more introverted and value solitude. You may find social interactions draining and prefer to recharge in quiet environments. Embrace your introspective nature but also consider practicing social skills to feel more at ease in group settings.",
                "Your extraversion score is somewhat below average, indicating that you might lean towards introversion. You may appreciate socializing in smaller groups but can also enjoy time alone. Keep nurturing your connections and seek balance between solitude and social engagement.",
                "Your extraversion score is average, suggesting that you're an ambivert – a blend of introverted and extraverted traits. You're likely comfortable in various social situations and can appreciate both alone time and group activities. Continue to adapt to different environments and maintain a balanced social life.",
                "Your high extraversion score reflects your outgoing and energetic nature. You enjoy socializing, meeting new people, and engaging in group activities. While your extraverted qualities can be contagious, remember to respect the boundaries of others who may need more personal space.",
                "With an exceptionally high extraversion score, you are a true social butterfly. Your enthusiasm and charisma make you the life of the party. As you thrive on social interaction, remember to also give yourself time for introspection and consider the preferences of those around you."
            ],
            traitIndex: 0,
        },
        {
            name: "Agreeableness",
            descriptions: [
                "With a low Agreeableness score, you are likely to be straightforward and unfiltered, valuing honest expression over diplomacy. You may have a competitive nature and make decisions based on logic rather than emotions. Working on empathy and active listening can help enhance your connections with others.",
                "Scoring below average in Agreeableness, you can be both cooperative and assertive, but may lean towards prioritizing personal goals. You have a practical approach to solving problems and may seem blunt in your communication. Developing emotional intelligence and patience can support better social interactions.",
                "Your average Agreeableness score suggests a balanced approach to relationships, allowing you to be both supportive and independent. You can adapt to different social situations and appreciate fairness. Strengthening your negotiation and conflict resolution skills can help in fostering deeper connections.",
                "A high Agreeableness score demonstrates your strong empathetic abilities and genuine concern for others. You are skilled in maintaining harmony and often put others' needs before your own. It is crucial to ensure that your kindness does not lead to self-sacrifice or being taken advantage of.",
                "With an exceptionally high Agreeableness score, your innate nurturing and selfless nature stands out. Your deep sense of compassion makes you a valuable friend and confidant. Remember to maintain healthy boundaries and practice self-care to avoid feeling overwhelmed or burnt out."
            ],
            traitIndex: 1,
        },
        {
            name: "Neuroticism",
            descriptions: [
                "With an exceptionally high Neuroticism score, you may often feel overwhelmed by stress and struggle with managing your emotions. Seeking professional support, such as therapy or counseling, can be beneficial in learning effective coping strategies and improving your emotional well-being.",
                "A high Neuroticism score suggests that you may be more sensitive to stress and experience negative emotions more intensely. Developing coping strategies and engaging in activities that promote relaxation and well-being can help you achieve better emotional balance.",
                "Your average Neuroticism score indicates that you experience a mix of emotional stability and instability. You may handle some stressors with ease, while others may pose challenges. Building a solid self-care routine and exploring stress reduction techniques can help improve emotional regulation.",
                "Scoring below average in Neuroticism, you are generally even-tempered and can cope with stress effectively. While you may occasionally experience negative emotions, you tend to bounce back quickly. Further developing your stress management techniques can support your emotional health.",
                "With a very low Neuroticism score, you possess exceptional emotional stability and are rarely disturbed by stress. Your calm and composed demeanor is an asset in high-pressure situations. Continue to nurture your mental well-being and resilience to maintain this balance."
            ],
            traitIndex: 3,
        }
    ];

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
                <div className="flex flex-col py-6 space-y-3 h-5/6 w-full items-center justify-center description">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold lg:mb-10 text-center">{traitName}</h2>
                    <p className="md:text-2xl lg:text-3xl text-center">
                        {descriptions[descriptionIndex]}
                    </p>
                </div>
            </>
        );
    }


    return (
        <div className="bg-gray-900 text-white h-screen w-full flex justify-center items-center flex-col">
            <div className="p-5 rounded-xl h-screen w-11/12 lg:w-3/4 flex-1">
                <div className=" flex flex-col shadow-lg w-full h-full justify-center">
                    <div className="px-12 py-5 bg-white rounded-t-xl">
                        <h2 className="text-gray-800 text-3xl font-semibold justify-center flex">Your results:</h2>
                    </div>
                    <div className="bg-gray-200 w-full flex flex-col h-4/6 text-black px-5 justify-around items-center">
                        {page === 0 &&
                            <>

                                <PageOne answers={answers} questions={questions} />
                            </>
                        }
                        {traits.map((trait, index) => {
                            if (page === index + 1) {
                                return (
                                    <TraitSection
                                        key={trait.name}
                                        traitName={trait.name}
                                        descriptions={trait.descriptions}
                                        traitIndex={trait.traitIndex}

                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                    <div className="w-full px-3 flex flex-row justify-around gap-5 items-end border-b-4 bg-gray-200">
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