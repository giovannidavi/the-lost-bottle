import { render, screen } from '@testing-library/react';
import { BoardContext } from '../BoardContext';
import { extendRadius } from '../utils';
import { Board } from './Board';

const renderWithCustomProvider = (ui, props) => {
  return render(<BoardContext.Provider value={props}>{ui}</BoardContext.Provider>);
};

const defaultValues = {
  rows: 1,
  cols: 1,
  GBgbArea: [],
  SafeArea: [],
  bottle: [],
  henry: [],
};

test('Board rows and cells', () => {
  const value = {
    ...defaultValues,
    rows: 11,
    cols: 22,
  };
  renderWithCustomProvider(<Board />, value);

  expect(screen.getAllByTestId('row')).toHaveLength(11);
  for (let i = 0; i < 11; i++) {
    for (let j = 0; j < 22; j++) {
      expect(screen.getByTestId(`cell-${i}-${j}`)).toBeInTheDocument();
    }
  }
});

test('Board GB and Safe areas', () => {
  const GBgbArea = extendRadius([2, 2], 1, 11, 22);
  const SafeArea = extendRadius([2, 2], 2, 11, 22);
  const value = {
    ...defaultValues,
    rows: 11,
    cols: 22,
    GBgbArea,
    SafeArea,
  };
  renderWithCustomProvider(<Board />, value);

  for (const position of GBgbArea) {
    expect(screen.getByTestId(`cell-${position[0]}-${position[1]}`)).toHaveStyle('background-color: #f2a7a7');
  }

  for (const position of SafeArea) {
    if (GBgbArea.find(([r, c]) => position[0] === r && position[1] === c)) {
      continue;
    }
    expect(screen.getByTestId(`cell-${position[0]}-${position[1]}`)).toHaveStyle('background-color: #d0e8d3');
  }
});
