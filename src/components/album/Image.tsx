import React, { FC } from 'react'
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ImageDb } from '../../hooks/useGetImages';
import { TOGGLE_IMAGE } from '../../store/imagesReducer';

type Props = {
    image: ImageDb;
    canBeToggled?: boolean;
}

const CardImageContainer = styled(Card)`
    margin-bottom: 1rem;
    border: ${(props => props.selected ? "6px solid #d4edda": "none")}; 
`;

const Image: FC<Props> = ({ image, canBeToggled = true }) => {
    const dispatch = useDispatch();
    return (
        <CardImageContainer selected={image.selected} onClick={canBeToggled ? () => dispatch({ type: TOGGLE_IMAGE, payload: image }) : null } >
            <Card.Img variant="top" src={image.url || "https://via.placeholder.com/150"} />
        </CardImageContainer>
    )
}

export default Image;
