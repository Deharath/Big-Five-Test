import './App.css';
import Welcome from './components/Welcome/welcome.js';
import Questionnaire from './components/Questionaire/questionaire.js';
import Results from './components/Results/results.js';
import { useState } from 'react';
import questions from './data/questions.json'

function App() {
  const [currentPhase, setCurrentPhase] = useState('welcome');
  const [answers, setAnswers] = useState([]);

  function handlePhaseChange(newPhase, newAnswers) {
    setCurrentPhase(newPhase);
    setAnswers(newAnswers);
  }

  return (
    <div className="App h-full w-full">
      {currentPhase === 'welcome' && <Welcome onPhaseChange={handlePhaseChange} />}
      {currentPhase === 'questionnaire' && <Questionnaire onPhaseChange={handlePhaseChange} questions={questions}/>}
      {currentPhase === 'results' && <Results onPhaseChange={handlePhaseChange} answers={answers} questions={questions}/>}    
    </div>
  );
}
export default App;
