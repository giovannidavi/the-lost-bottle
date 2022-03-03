/**
 * Returns a randomly generated position within the given bounds, avoiding the positions give in the avoid array.
 * @param {number} rows
 * @param {number} cols
 * @param {number[][]} avoid
 * @returns number[]
 */
export function getStartPoint(rows, cols, avoid) {
  let row = null;
  let col = null;
  while (row === null && col === null) {
    const tryPosition = [getRandomArbitrary(0, rows - 1), getRandomArbitrary(0, cols - 1)];
    if (!avoid.find(([r, c]) => tryPosition[0] === r && tryPosition[1] === c)) {
      row = tryPosition[0];
      col = tryPosition[1];
    }
  }

  return [row, col];
}

/**
 * Returns a random number between min and max.
 * @param {number} min
 * @param {number} max
 * @returns
 */
export function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Returns a random position within the given bounds.
 * @param {number} rows
 * @param {number} cols
 * @returns
 */
export function getRandomPosition(rows, cols) {
  return [getRandomArbitrary(0, rows - 1), getRandomArbitrary(0, cols - 1)];
}

/**
 * Returns the new extended area of a given position, extend by the given radius, the rows and cols bound will be used to generate the pacman effect.
 * @param {number[]} position
 * @param {number} radius
 * @param {number} rows
 * @param {number} cols
 * @returns
 */
export function extendRadius(position, radius, rows, cols) {
  const [row, col] = position;
  const area = [];

  for (let i = row - radius; i <= row + radius; i++) {
    for (let j = col - radius; j <= col + radius; j++) {
      area.push([pacManEffect(i, rows), pacManEffect(j, cols)]);
    }
  }

  return area;
}

/**
 * Returns the new position after a given move, based on the pacman effect.
 * @param {number} value
 * @param {number} max
 * @returns number
 */
export function pacManEffect(value, max) {
  if (value < 0) {
    return max + value;
  }
  if (value >= max) {
    return value - max;
  }
  return value;
}

/**
 * Returns a random move, the first element is a number (the moves) the second is the direction.
 * The direction will be generated based on the given directions array - which may or may not include all the possible directions.
 * @param {[]} directions
 * @returns [string, number]
 */
export function rollDices(directions) {
  const direction = directions[getRandomArbitrary(1, 6) - 1];
  const moves = getRandomArbitrary(1, 6);
  return [direction, moves];
}

/**
 * Returns the opposite direction of the given direction.
 * @param {string} direction
 * @returns string
 */
export function getOppositeDirection(direction) {
  switch (direction) {
    case 'N':
      return 'S';
    case 'NE':
      return 'SW';
    case 'NW':
      return 'SE';
    case 'S':
      return 'N';
    case 'SE':
      return 'NW';
    case 'SW':
      return 'NE';
    case 'W':
      return 'E';
    case 'E':
      return 'W';
    default:
      return null;
  }
}

/**
 * Returns the new position after a given move.
 * @param {number[]} position
 * @param {string} direction
 * @param {number} moves
 * @param {number} rows
 * @param {number} cols
 * @returns number[]
 */
export function calculateNewPosition(position, direction, moves, rows, cols) {
  const [row, col] = position;
  const newPosition = [row, col];

  if (direction === 'N') {
    newPosition[0] = pacManEffect(row - moves, rows);
  } else if (direction === 'NE') {
    newPosition[0] = pacManEffect(row + moves, rows);
    newPosition[1] = pacManEffect(col + moves, cols);
  } else if (direction === 'NW') {
    newPosition[0] = pacManEffect(row + moves, rows);
    newPosition[1] = pacManEffect(col - moves, cols);
  } else if (direction === 'S') {
    newPosition[0] = pacManEffect(row + moves, rows);
  } else if (direction === 'SE') {
    newPosition[0] = pacManEffect(row + moves, rows);
    newPosition[1] = pacManEffect(col + moves, cols);
  } else if (direction === 'SW') {
    newPosition[0] = pacManEffect(row + moves, rows);
    newPosition[1] = pacManEffect(col - moves, cols);
  } else if (direction === 'W') {
    newPosition[1] = pacManEffect(col - moves, cols);
  } else if (direction === 'E') {
    newPosition[1] = pacManEffect(col + moves, cols);
  }

  return newPosition;
}
