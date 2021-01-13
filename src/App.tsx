import React from 'react';
import { Container } from 'react-bootstrap';
import { Routes, Route} from 'react-router-dom';
// import SimpleReactLightbox from 'simple-react-lightbox';
import AuthRoute from './components/auth/AuthRoute';
import Login from './components/auth/login/Login';
import LogOut from './components/auth/logout/LogOut';
import ResetPassword from './components/auth/resetPassword/ResetPassword';
import SignUp from './components/auth/signup/SignUp';
import Main from './components/main/Main';
import UploadImagesToAlbum from './components/album/UploadImagesToAlbum';
import Review from './components/review/Review';
import Navbar from './components/navbar/NavbarComponent';
import SuccessPage from './components/review/SuccessPage';


function App() {
  return (
    <div id="APP">
        <Navbar />
        <Container>
            <Routes>
                <AuthRoute path="/">
                    <Main />
                </AuthRoute>
                <AuthRoute path="/album/:albumId">
                    <UploadImagesToAlbum />
                </AuthRoute>
                <Route path="/success">
                    <SuccessPage />
                </Route>
                <Route path="/review/:albumId">
                    <Review />
                </Route>
                <Route path="/log-out">
                    <LogOut />
                </Route>
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
