import React from 'react'
import styled from 'styled-components';
import AlbumGrid from '../album/AlbumGrid';
import CreateAlbum from '../album/CreateAlbum'

const Container = styled.div`
    padding-top: 2rem;
`;

const Main = () => {
    return (
        <Container>
            <CreateAlbum />

            <AlbumGrid />
        </Container>
    )
}

export default Main
