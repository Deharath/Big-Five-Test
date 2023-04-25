import './App.css';
import Welcome from './components/Welcome/welcome.js';
import Questionnaire from './components/Questionaire/questionaire.js';
import Results from './components/Results/results.js';
import { useState } from 'react';

function App() {
  const [currentPhase, setCurrentPhase] = useState('welcome');
  const [answers, setAnswers] = useState([]);

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

  function handlePhaseChange(newPhase, newAnswers) {
    setCurrentPhase(newPhase);
    setAnswers(newAnswers);
  }

  return (
    <div className="App h-full">
      {currentPhase === 'welcome' && <Welcome onPhaseChange={handlePhaseChange} />}
      {currentPhase === 'questionnaire' && <Questionnaire onPhaseChange={handlePhaseChange} questions={questions}/>}
      {currentPhase === 'results' && <Results onPhaseChange={handlePhaseChange} answers={answers} questions={questions}/>}    
    </div>
  );
}
export default App;
