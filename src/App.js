import styled from 'styled-components';
import Router from './router';

function App() {
  return (
    <AppStyled>
      <Router />
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  width: 100vw;
`;

export default App;
