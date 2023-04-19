import './App.css';
import Welcome from './components/Welcome/welcome.jsx';
import Questionnaire from './components/Questionaire/questionaire.js';
import { useState } from 'react';

function App() {
  const [currentPhase, setCurrentPhase] = useState('welcome');

  function handlePhaseChange(newPhase) {
    setCurrentPhase(newPhase);
  }

  return (
    <div className="App">
      {currentPhase === 'welcome' && <Welcome onButtonClick={handlePhaseChange} />}
      {currentPhase === 'questions' && <Questionnaire />}
      
    </div>
  );
}
//{currentPhase === 'results' && <Results />}
export default App;
