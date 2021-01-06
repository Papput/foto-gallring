import { Container } from 'react-bootstrap';
import { Routes, Route} from 'react-router-dom';
import AuthRoute from './components/auth/AuthRoute';
import Login from './components/auth/login/Login';
import ResetPassword from './components/auth/resetPassword/ResetPassword';
import SignUp from './components/auth/signup/SignUp';

function App() {
  return (
    <div id="APP">
        <Container>
            <Routes>
                <AuthRoute path="/">
                    Home
                </AuthRoute>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/sign-up">
                    <SignUp />
                </Route>
                <Route path="/password-reset">
                    <ResetPassword />
                </Route>
            </Routes>
        </Container>
    </div>
  );
}

export default App;
