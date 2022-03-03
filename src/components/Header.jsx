import styled from '@emotion/styled';
import { useContext } from 'react';
import { BoardContext } from '../BoardContext';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${(props) => props.cols * 33}px;
`;

const Title = styled.h1`
  color: #626262;
  font-weight: 900;
  padding: 20px 0;
`;

const InfoBox = styled.div`
  background-color: ${(props) =>
    props.winner === 'Bottle' ? '#e94949' : props.winner === 'Henry' ? '#62db62' : '#fff'};
  color: ${(props) => (props.winner ? '#fff' : '#000')};
  padding: 20px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  margin-left: 20px;
`;

const RollDicesButton = styled.button`
  background-color: #000;
  border: none;
  border-radius: 5px;
  padding: 20px;
  font-size: 18px;
  color: #fff;
  font-weight: 900;
  margin-left: 20px;
  cursor: pointer;
  &:disabled {
    background-color: #333;
    cursor: not-allowed;
  }
`;

export function Header() {
  const { turn, lastMove, handleRollDices, rolling, winner, start, cols } = useContext(BoardContext);
  return (
    <Wrapper cols={cols}>
      <Title>The Lost Bottle</Title>
      <div style={{ display: 'flex' }}>
        {winner && <InfoBox winner={winner}>{winner} wins!</InfoBox>}
        {lastMove && (
          <InfoBox>
            {turn === 'Henry' ? 'Bottle' : 'Henry'} moved {lastMove[1]} cells to {lastMove[0]}
          </InfoBox>
        )}
        <InfoBox>It's {turn}'s turn</InfoBox>
        <RollDicesButton disabled={!start || rolling || winner} onClick={handleRollDices}>
          Roll Dices
        </RollDicesButton>
      </div>
    </Wrapper>
  );
}
