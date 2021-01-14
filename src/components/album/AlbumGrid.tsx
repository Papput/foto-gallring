import React, { FC } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import useGetAlbums from '../../hooks/useGetAlbums';

const StyledRow = styled(Row)`
    padding-top: 1rem;
`;

const AlbumGrid: FC = () => {
    const { albums } = useGetAlbums();
    return (
        <ListGroup>
            {albums.map((album) => {
                return (
                    <ListGroup.Item key={album.id} as={Link} action to={`/album/${album.id}`}>
                        {album.title} {album?.date}
                    </ListGroup.Item>
                )
            })}
        </ListGroup>
    )
}

export default AlbumGrid
