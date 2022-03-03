import '@testing-library/jest-dom';

import * as utils from './utils';
import { Directions } from './constants';

test('getStartPoint', () => {
  const avoids = [];
  const max = 5;
  for (let i = 0; i <= max; i++) {
    for (let j = 0; j <= max; j++) {
      if (i !== 5 || j !== 5) {
        avoids.push([i, j]);
        avoids.push([j, i]);
      }
    }
  }
  const result = utils.getStartPoint(6, 6, avoids);
  expect(result).toEqual([5, 5]);
});

test('getRandomArbitrary', () => {
  const result = utils.getRandomArbitrary(0, 5);
  expect([...Array(6).keys()].includes(result)).toBeTruthy();
});

test('getRandomPosition', () => {
  const result = utils.getRandomPosition(5, 5);
  expect([...Array(5).keys()].includes(result[0])).toBeTruthy();
  expect([...Array(5).keys()].includes(result[1])).toBeTruthy();
});

test('extendRadius', () => {
  const result = utils.extendRadius([5, 5], 1, 10, 10);
  expect(result.length).toBe(9);
  expect(result).toEqual([
    [4, 4],
    [4, 5],
    [4, 6],
    [5, 4],
    [5, 5],
    [5, 6],
    [6, 4],
    [6, 5],
    [6, 6],
  ]);
});

test('pacManEffect', () => {
  expect(utils.pacManEffect(1, 5)).toBe(1);
  expect(utils.pacManEffect(5, 5)).toBe(0);
  expect(utils.pacManEffect(6, 5)).toBe(1);
  expect(utils.pacManEffect(7, 5)).toBe(2);
  expect(utils.pacManEffect(-1, 5)).toBe(4);
  expect(utils.pacManEffect(-2, 5)).toBe(3);
});

test('rollDices', () => {
  const result = utils.rollDices(Directions);
  expect(Directions.includes(result[0])).toBeTruthy();
  expect(result[1]).toBeGreaterThanOrEqual(1);
  expect(result[1]).toBeLessThanOrEqual(6);
});

test('getOppositeDirection', () => {
  expect(utils.getOppositeDirection('N')).toBe('S');
  expect(utils.getOppositeDirection('NE')).toBe('SW');
  expect(utils.getOppositeDirection('NW')).toBe('SE');
  expect(utils.getOppositeDirection('S')).toBe('N');
  expect(utils.getOppositeDirection('SE')).toBe('NW');
  expect(utils.getOppositeDirection('SW')).toBe('NE');
  expect(utils.getOppositeDirection('W')).toBe('E');
  expect(utils.getOppositeDirection('E')).toBe('W');
});

test('calculateNewPosition', () => {
  const result = utils.calculateNewPosition([5, 5], 'N', 5, 10, 10);
  expect(result).toEqual([0, 5]);
  const result2 = utils.calculateNewPosition([5, 5], 'S', 5, 10, 10);
  expect(result2).toEqual([0, 5]);
  const result3 = utils.calculateNewPosition([5, 5], 'E', 5, 10, 10);
  expect(result3).toEqual([5, 0]);
  const result4 = utils.calculateNewPosition([5, 5], 'W', 5, 10, 10);
  expect(result4).toEqual([5, 0]);
  const result5 = utils.calculateNewPosition([5, 5], 'NE', 3, 10, 10);
  expect(result5).toEqual([8, 8]);
  const result6 = utils.calculateNewPosition([5, 5], 'NW', 3, 10, 10);
  expect(result6).toEqual([8, 2]);
  const result7 = utils.calculateNewPosition([5, 5], 'SE', 6, 10, 10);
  expect(result7).toEqual([1, 1]);
  const result8 = utils.calculateNewPosition([5, 5], 'SW', 5, 10, 10);
  expect(result8).toEqual([0, 0]);
});
