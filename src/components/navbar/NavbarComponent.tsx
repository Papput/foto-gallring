import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom'
import { RootState } from '../../store/rootReducer';
import { totalImagesSelector } from '../../store/imagesReducer';

const SendReviewTotalImages = styled.h2`
    font-size: 2rem;
`;

const NavbarComponent = () => {
    const auth = useSelector((state: RootState) => state.firebase.auth);
    const {totalImages, imagesSelected, imagesThumbsDown} = useSelector(totalImagesSelector)

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={NavLink} to="/"><span>👎</span> Rate Photos <span>👍</span></Navbar.Brand>
            {totalImages > 0 && (
                <SendReviewTotalImages>
                    <span className="text-success">{imagesSelected}</span> / <span>{totalImages}</span>
                </SendReviewTotalImages>)
            }
            
            {!auth.isEmpty &&
                <>
                    <Navbar.Toggle aria-controls="navbar-nav" />
                    <Navbar.Collapse id="navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link as={NavLink} to="/log-out">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </> 
            }
        </Navbar>
    )
}

export default NavbarComponent;
