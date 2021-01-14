import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useGetAlbums from '../../hooks/useGetAlbums';

const StyledRow = styled(Row)`
    padding-top: 1rem;
`;

const AlbumGrid: FC = () => {
    const { albums } = useGetAlbums();
    return (
        <StyledRow>
            {albums.map((album) => {
                return (
                    <Col key={album.id} sm={6} md={4}>
                        <Link to={`/album/${album.id}`}>{album.title} {album?.date}</Link>
                    </Col>
                )
            })}
        </StyledRow>
    )
}

export default AlbumGrid
