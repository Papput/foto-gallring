import { Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div id="APP">
        <Routes>
            <Route path="/">
                Home
            </Route>
            <Route path="/login">
                <p>Login</p>
            </Route>
        </Routes>
    </div>
  );
}

export default App;
