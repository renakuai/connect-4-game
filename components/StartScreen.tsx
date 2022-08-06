import * as React from 'react';
import { useState, useEffect } from 'react';

export default function StartScreen(props) {
  const { setPlayerName, setStart, playerName } = props;

  return (
    <div className="start">
      <fieldset>
        <legend>What is your name?</legend>
        <input
          type="text"
          name="name"
          id="name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </fieldset>
      <fieldset>
        <legend>What difficulty would you like to play?</legend>
        <input
          type="radio"
          name="difficulty"
          value="easy"
          onClick={() => localStorage.setItem('difficulty', 'easy')}
        />
        <label htmlFor="easy">Easy</label>

        <input
          type="radio"
          name="difficulty"
          value="medium"
          onClick={() => localStorage.setItem('difficulty', 'medium')}
        />
        <label htmlFor="medium">Medium</label>

        <input
          type="radio"
          name="difficulty"
          value="difficult"
          onClick={() => localStorage.setItem('difficulty', 'difficult')}
        />
        <label htmlFor="difficult">Difficult</label>
      </fieldset>

      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          setStart(true);
        }}
      >
        Start!
      </button>
    </div>
  );
}
