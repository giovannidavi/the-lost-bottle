import styled from '@emotion/styled';
import { useContext } from 'react';
import { BoardContext } from '../BoardContext';

const SidebarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${(props) => props.cols * 33}px;
  margin: 0 auto;
`;

const LegendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border: 1px solid #646464;
  padding: 20px;
  font-size: 14px;
  border-radius: 5px;
  margin: 20px 0;
`;

const Legend = styled.div`
  align-items: center;
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: 1fr 1fr;
  grid-gap: 20px;
  > div {
    display: flex;
    align-items: center;
    margin-right: 20px;
    > b {
      margin-right: 10px;
    }
  }
`;

const ProtectedArea = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #d0e8d3;
  margin-right: 10px;
`;

const GBgbArea = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #f2a7a7;
  margin-right: 10px;
`;

const StartButton = styled.button`
  background-color: #00eb12;
  text-transform: uppercase;
  border: none;
  border-radius: 5px;
  padding: 20px;
  font-size: 18px;
  color: #000;
  font-weight: 900;
  margin-left: 20px;
  cursor: pointer;
`;

export function Sidebar() {
  const { restart, start, setStart, cols } = useContext(BoardContext);

  return (
    <SidebarWrapper cols={cols}>
      <div>
        LEGEND:
        <LegendWrapper>
          <Legend>
            <div>
              <img width="30px" src="https://cdn-icons-png.flaticon.com/512/146/146010.png" alt="Henry" />
              <span>Henry</span>
            </div>
            <div>
              <img width="30px" src="https://cdn-icons-png.flaticon.com/512/824/824239.png" alt="Henry" />
              <span>Bottle</span>
            </div>
            <div>
              <ProtectedArea />
              <span>Protected Area</span>
            </div>
            <div>
              <GBgbArea />
              <span>Protected Area</span>
            </div>
            <div>
              <b>N:</b>
              <span>North</span>
            </div>
            <div>
              <b>S:</b>
              <span>South</span>
            </div>
            <div>
              <b>E:</b>
              <span>East</span>
            </div>
            <div>
              <b>W:</b>
              <span>West</span>
            </div>
            <div>
              <b>NE:</b>
              <span>North East</span>
            </div>
            <div>
              <b>NW:</b>
              <span>North West</span>
            </div>
            <div>
              <b>SE:</b>
              <span>South East</span>
            </div>
            <div>
              <b>SW:</b>
              <span>South West</span>
            </div>
          </Legend>
        </LegendWrapper>
      </div>
      <StartButton onClick={() => (start ? restart() : setStart(true))}>{start ? 'Restart' : 'Start'}</StartButton>
    </SidebarWrapper>
  );
}
