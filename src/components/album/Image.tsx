import React, { FC } from 'react'
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ImageDb } from '../../hooks/useGetImages';
import { TOGGLE_IMAGE } from '../../store/imagesReducer';
import {FaRegTrashAlt} from "react-icons/fa"
import useRemoveImageFromAlbum from '../../hooks/useRemoveImageFromAlbum';
import { useParams } from 'react-router';

type Props = {
    image: ImageDb;
    canBeToggled?: boolean;
    canBeDeleted?: boolean;
}

const CardImageContainer = styled(Card)`
    margin-bottom: 1rem;
    border: ${(props => props.selected ? "6px solid #d4edda": "none")};
    position: relative;
`;

const TrashIcon = styled(FaRegTrashAlt)`
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 2rem;
    cursor: pointer;
`

const Image: FC<Props> = ({ image, canBeToggled = true, canBeDeleted = false }) => {
    const dispatch = useDispatch();
    const {albumId} = useParams();
    const { removeImageFromAlbum } = useRemoveImageFromAlbum();

    const handleDelete = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();

        removeImageFromAlbum(albumId, image.id);
    }
    return (
        <CardImageContainer selected={image.selected} onClick={canBeToggled ? () => dispatch({ type: TOGGLE_IMAGE, payload: image }) : null } >
            {canBeDeleted && <TrashIcon onClick={(e) => handleDelete(e)} />}
            <Card.Img variant="top" src={image.url || "https://via.placeholder.com/150"} />
        </CardImageContainer>
    )
}

export default Image;
