
import { useState } from 'react';
import './App.css';
import { TimerProvider } from './context/TimerContext';
import Timer from './components/Timer';

function App() {
  const [isRunning, setIsRunning] = useState(false);

  const handleStart = () => {
    setIsRunning(!isRunning);
  };

  return (
    <TimerProvider>
      <div className="App">
        <header className="App-header">
          <h1>HIIT Timer</h1>
          <button onClick={handleStart}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <Timer />
        </header>
      </div>
    </TimerProvider>
  );
}

export default App;
      