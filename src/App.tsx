import { Container } from 'react-bootstrap';
import { Routes, Route} from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <div id="APP">
        <Container>
            <Routes>
                <Route path="/">
                    Home
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
            </Routes>
        </Container>
    </div>
  );
}

export default App;
