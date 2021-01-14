import React, { FC } from 'react';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useGetAlbums from '../../hooks/useGetAlbums';

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
