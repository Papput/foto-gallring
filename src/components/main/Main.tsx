import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import CreateAlbum from '../album/CreateAlbum'

const Navigation = styled.div`
    padding-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const Main = () => {
    return (
        <div>
            <Navigation>
                <Link to="log-out">Log out</Link>
            </Navigation>

            <CreateAlbum />
        </div>
    )
}

export default Main
