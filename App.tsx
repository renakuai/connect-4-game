import * as React from 'react';
import './style.css';
import { useState, useEffect } from 'react';
import Game from './components/Game';
import StartScreen from './components/StartScreen';

export default function App() {
  const [start, setStart] = useState(false);
  const [playerName, setPlayerName] = useState('');

  return (
    <div className="content">
      {!start ? (
        <StartScreen
          setPlayerName={setPlayerName}
          playerName={playerName}
          setStart={setStart}
        />
      ) : (
        <Game playerName={playerName} />
      )}
    </div>
  );
}
