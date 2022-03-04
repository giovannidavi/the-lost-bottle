import { useContext } from 'react';
import styled from '@emotion/styled';
import { BoardContext } from '../BoardContext';
import { Henry } from './Henry';
import { Bottle } from './Bottle';

const Row = styled.div`
  display: flex;

  &:last-of-type {
    > div {
      border-bottom: 1px solid #646464;
    }
  }
`;

const Col = styled.div`
  width: 30px;
  height: 30px;
  border-width: 1px 0 0 1px;
  border-style: solid;
  background-color: ${(props) => (props.isGB ? '#f2a7a7' : props.isSafe ? '#d0e8d3' : '#f9f9f9')};
  border-color: ${(props) =>
    props.isBottle && props.isHenry ? 'blue' : props.isBottle ? '#000000' : props.isHenry ? '#ff0000' : '#646464'};
  position: relative;
  &:last-of-type {
    border-right-width: 1px;
  }
`;

const ColHeader = styled.div`
  border-width: 1px 1px 0 0;
  border-style: solid;
  border-color: transparent !important;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;
  font-size: 13px;
  border-color: transparent;
  background-color: #fff;
`;

const BoardPanel = styled.div`
  margin: 20px;
  width: fit-content;
  padding: 24px;
  box-shadow: 10px 10px 26px 0 rgba(0, 0, 0, 0.12);
  background-color: #ffffff;
  border-radius: 12px;
`;

export function Board() {
  const { rows, cols, GBgbArea, SafeArea, henry, bottle } = useContext(BoardContext);
  return (
    <BoardPanel data-testid="board">
      <Row>
        <ColHeader />
        {[...Array(cols)].map((_, i) => (
          <ColHeader key={i}>C{i + 1}</ColHeader>
        ))}
      </Row>
      {new Array(rows).fill(0).map((_, row) => (
        <Row key={`row-${row}`} data-testid="row">
          <ColHeader>R{row + 1}</ColHeader>
          {new Array(cols).fill(0).map((_, col) => (
            <Col
              data-testid={`cell-${row}-${col}`}
              key={`cell-${row}-${col}`}
              isGB={!!GBgbArea.find(([r, c]) => r === row && c === col)}
              isSafe={!!SafeArea.find(([r, c]) => r === row && c === col)}
              isBottle={bottle.toString() === `${row},${col}`}
              isHenry={henry.toString() === `${row},${col}`}
            >
              {bottle.toString() === `${row},${col}` && <Bottle />}
              {henry.toString() === `${row},${col}` && <Henry />}
            </Col>
          ))}
        </Row>
      ))}
    </BoardPanel>
  );
}
