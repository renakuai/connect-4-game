import * as React from 'react';
import { useState, useEffect } from 'react';

export default function Game(props) {
  const { playerName, setStart } = props;

  const [gameboard, setGameboard] = useState([
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
  ]);

  const [moves, setMoves] = useState([]);

  const [end, setEnd] = useState(false);

  const [player, setPlayer] = useState({
    first: '',
    second: '',
    active: '',
  });

  const [winner, setWinner] = useState('');

  const [err, setErr] = useState('');

  //randomly pick player 1
  useEffect(() => {
    const first = Math.round(Math.random());
    if (first === 0) {
      setPlayer({
        ...player,
        first: 'computer',
        second: playerName,
        active: 'computer',
      });
    } else if (first === 1) {
      setPlayer({
        ...player,
        first: playerName,
        second: 'computer',
        active: playerName,
      });
    }
  }, []);

  //api call
  useEffect(() => {
    if (player.active === 'computer' && !winner) {
      const fetchInterval = setTimeout(() => {
        if (player.active === 'computer') {
          let url = '';
          if (moves.length === 0) {
            url =
              'https://connect4-serverless-fn-tony-tectonai.vercel.app/api?';
          } else {
            url =
              'https://connect4-serverless-fn-tony-tectonai.vercel.app/api?moves=' +
              moves.join() +
              '&' +
              'difficulty=' +
              localStorage.getItem('difficulty');
            console.log(url);
          }
          fetch(url)
            .then((res) => res.json())
            .then((data) => makeMove(data))
            .catch((err) => setErr(err));
        }
      }, 1000);
      return () => {
        clearInterval(fetchInterval);
      };
    }
  }, [player]);

  //make move for bot + player
  function makeMove(data) {
    if (player.active === 'computer') {
      setMoves((prev) => prev.concat(data.bot_move));
      gameLogic(data.bot_move);
      checkEnd(data.winner);
      setPlayer({
        ...player,
        active: playerName,
      });
    } else {
      setMoves((prev) => prev.concat(+data.id[0]));
      gameLogic(+data.id[0]);
      checkEnd(data.winner);
      setPlayer({
        ...player,
        active: 'computer',
      });
    }
  }

  //logic for displaying board + checking where to place
  function gameLogic(col) {
    //loop through each row starting from bottom
    for (let i = 5; i >= 0; i--) {
      if (!gameboard[i][col]) {
        //loop through gameboard row to update cel
        const gamerow = gameboard[i].map((column, index) => {
          if (index === col) {
            return player.active;
          } else {
            return column;
          }
        });
        //loop through gameboard to update whole row
        const updatedGameboard = gameboard.map((row, index) => {
          if (i === index) {
            return gamerow;
          } else {
            return row;
          }
        });
        //update gameboard state
        setGameboard(updatedGameboard);
        return;
      }
    }
  }

  //checking end state
  function checkEnd(winData) {
    if (winData) {
      setEnd(true);
      if (winData == 1) {
        setWinner(player.first);
      } else {
        setWinner(player.second);
      }
    }
  }

  //render pieces colors
  function renderColor(col) {
    if (col) {
      if (col === 'computer') {
        return { backgroundColor: 'yellow' };
      } else {
        return { backgroundColor: 'red' };
      }
    } else {
      return { backgroundColor: 'white' };
    }
  }

  function restartGame() {
    setStart(false);
  }

  return (
    <div className="container">
      {!end ? (
        <div className="turn">
          <h2>{player.active + "'s turn"}</h2>
        </div>
      ) : (
        <div className="end">
          <h2>
            {winner === 'computer'
              ? 'Game over! Sorry, the ' + winner + ' won this time around 😔'
              : 'Game over! Congrats, ' + winner + '! You won the game! 🎉'}
          </h2>
          <button type="button" onClick={restartGame}>
            Play New Game
          </button>
        </div>
      )}
      <div className="gameboard">
        {gameboard.map((row, rowIndex) =>
          gameboard[rowIndex].map((col, colIndex) => (
            <div
              className="grid"
              key={colIndex + '_' + rowIndex}
              id={colIndex + '_' + rowIndex}
              onClick={(e) =>
                player.active !== 'computer' && !end ? makeMove(e.target) : null
              }
              style={renderColor(col)}
            />
          ))
        )}
      </div>
    </div>
  );
}
