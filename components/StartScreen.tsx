import * as React from 'react';
import { useState, useEffect } from 'react';

export default function StartScreen(props) {
  const { setPlayerName, setStart, playerName } = props;

  return (
    <div className="container" id="start-form">
      <h1>Let's play Connect 4!</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setStart(true);
        }}
      >
        <label htmlFor="name" id="question">
          What is your name?*
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={playerName}
          placeholder="John Smith"
          required
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <label htmlFor="difficulty" id="question">
          What difficulty would you like to play?*
        </label>
        <div className="radio-group">
          <input
            required
            type="radio"
            name="difficulty"
            value="easy"
            onClick={() => localStorage.setItem('difficulty', 'easy')}
          />
          <label htmlFor="easy">Easy</label>
        </div>

        <div className="radio-group">
          <input
            type="radio"
            name="difficulty"
            value="medium"
            onClick={() => localStorage.setItem('difficulty', 'medium')}
          />
          <label htmlFor="medium">Medium</label>
        </div>

        <div className="radio-group">
          <input
            type="radio"
            name="difficulty"
            value="difficult"
            onClick={() => localStorage.setItem('difficulty', 'difficult')}
          />
          <label htmlFor="difficult">Difficult</label>
        </div>

        <button type="submit">Start Game!</button>
      </form>
    </div>
  );
}
