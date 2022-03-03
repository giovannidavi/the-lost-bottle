import { useContext } from 'react';
import styled from '@emotion/styled';
import { BoardContext } from '../BoardContext';
import { Henry } from './Henry';
import { Bottle } from './Bottle';
import { Coordinates } from './Coordinates';

const Row = styled.div`
  display: flex;
`;

const Col = styled.div`
  width: 30px;
  height: 30px;
  border: 1px solid;
  font-size: 8px;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  background-color: ${(props) => (props.isGB ? '#e94949' : props.isSafe ? '#62db62' : '#f9f9f9')};
  border-color: ${(props) =>
    props.isBottle && props.isHenry ? 'blue' : props.isBottle ? '#000000' : props.isHenry ? '#ff0000' : '#eee'};
  position: relative;
`;

const BoardPanel = styled.div`
  margin: 20px;
  width: fit-content;
  padding: 10px;
  box-shadow: 5px 5px 10px #c9c9c9;
  background-color: #ffffff;
  border-radius: 5px;
`;

export function Board() {
  const { rows, cols, GBgbArea, SafeArea, henry, bottle } = useContext(BoardContext);
  return (
    <BoardPanel data-testid="board">
      {new Array(rows).fill(0).map((_, row) => (
        <Row key={`row-${row}`} data-testid="row">
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
              <Coordinates value={`${row}/${col}`} />
            </Col>
          ))}
        </Row>
      ))}
    </BoardPanel>
  );
}
