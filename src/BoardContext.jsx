import { createContext, useCallback, useEffect, useState } from 'react';
import { Directions } from './constants';
import {
  calculateNewPosition,
  extendRadius,
  getOppositeDirection,
  getRandomPosition,
  getStartPoint,
  rollDices,
} from './utils';

export const BoardContext = createContext();

export function BoardContextProvider({ children }) {
  const rows = 24;
  const cols = 42;
  const [henry, setHenry] = useState([]);
  const [bottle, setBottle] = useState([]);
  const [SafeArea, setSafeArea] = useState([]);
  const [GBgbArea, setGBgbArea] = useState([]);
  const [GBgbPosition, setGBgbPosition] = useState(getRandomPosition(rows, cols));

  const [turn, setTurn] = useState('Bottle');
  const [winner, setWinner] = useState(null);
  const [lastMove, setLastMove] = useState(null);
  const [lastDirection, setLastDirection] = useState(null);

  const [start, setStart] = useState(false);
  const [rolling, setRolling] = useState(false);

  const handleRollDices = useCallback(async () => {
    setRolling(true);
    const directions = Directions.filter((dir) => dir !== lastDirection && dir !== getOppositeDirection(lastDirection));
    const [direction, moves] = rollDices(directions);
    setLastDirection(direction);
    if (turn === 'Henry') {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(setHenry((henry) => calculateNewPosition(henry, direction, moves, rows, cols)));
        }, 100);
      });
      setTurn('Bottle');
      setLastMove([direction, moves]);
      setRolling(false);
    } else {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(setBottle((bottle) => calculateNewPosition(bottle, direction, moves, rows, cols)));
        }, 100),
      );
      setTurn('Henry');
      setLastMove([direction, moves]);
      setRolling(false);
    }
  }, [lastDirection, turn]);

  const restart = useCallback(() => {
    setWinner(null);
    setGBgbPosition(getRandomPosition(rows, cols));
  }, []);

  useEffect(() => {
    // The Bottle can only play is the game is in progress
    if (turn === 'Bottle' && !rolling && !winner && start) {
      handleRollDices();
    }
  }, [handleRollDices, rolling, start, turn, winner]);

  useEffect(() => {
    // Once the GB center position is set we can generate the Safe Area and the GBgb Area
    setGBgbArea(extendRadius(GBgbPosition, 1, rows, cols));
    setSafeArea(extendRadius(GBgbPosition, 4, rows, cols));
  }, [GBgbPosition]);

  useEffect(() => {
    // Once the SafeArea is set we are ready to define a start position
    if (SafeArea.length) {
      const start = getStartPoint(rows, cols, SafeArea);
      setHenry(start);
      setBottle(start);
    }
  }, [SafeArea]);

  useEffect(() => {
    // The game has started
    if (lastMove) {
      // Check if the bottle is in the GBgb area or Henry has caught it
      if (
        GBgbArea.find(([r, c]) => henry[0] === r && henry[1] === c) ||
        (henry[0] === bottle[0] && henry[1] === bottle[1])
      ) {
        setWinner('Henry');
        setLastMove(null);
      }
      // Check if the bottle is in the GBgb area
      if (GBgbArea.find(([r, c]) => bottle[0] === r && bottle[1] === c)) {
        setWinner('Bottle');
        setLastMove(null);
      }
    }
  }, [GBgbArea, bottle, henry, lastMove, setLastMove, setWinner]);

  return (
    <BoardContext.Provider
      value={{
        rows,
        cols,
        GBgbArea,
        SafeArea,
        henry,
        bottle,
        handleRollDices,
        setBottle,
        setHenry,
        turn,
        setTurn,
        winner,
        setWinner,
        restart,
        lastMove,
        setLastMove,
        start,
        setStart,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
}
