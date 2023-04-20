import './App.css';
import Welcome from './components/Welcome/welcome.jsx';
import Questionnaire from './components/Questionaire/questionaire.js';
import Results from './components/Results/results.js';
import { useState } from 'react';

function App() {
  const [currentPhase, setCurrentPhase] = useState('welcome');
  const [answers, setAnswers] = useState([]);

  function handlePhaseChange(newPhase, newAnswers) {
    setCurrentPhase(newPhase);
    if (newAnswers) {
      setAnswers(newAnswers);
    }
  }

  return (
    <div className="App h-full">
      {currentPhase === 'welcome' && <Welcome onPhaseChange={handlePhaseChange} />}
      {currentPhase === 'questions' && <Questionnaire onPhaseChange={handlePhaseChange}/>}
      {currentPhase === 'results' && <Results onPhaseChange={handlePhaseChange} answers={answers} questions={Questionnaire.questions}/>}    
    </div>
  );
}
export default App;
