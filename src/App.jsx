import styled from '@emotion/styled';
import { BoardContextProvider } from './BoardContext';
import { Board } from './components/Board';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eeeeee;
`;

function App() {
  return (
    <BoardContextProvider>
      <Wrapper>
        <Header />
        <Board />
        <Sidebar />
      </Wrapper>
    </BoardContextProvider>
  );
}

export default App;
