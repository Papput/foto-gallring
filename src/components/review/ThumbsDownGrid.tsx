import React from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { THUMBS_DOWN_IMAGE, THUMBS_UP_IMAGE } from '../../store/imagesReducer';
import { RootState } from '../../store/rootReducer';
import Image from '../album/Image';

const StyledRow = styled(Row)`
    padding-top: 1rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const ThumbsDownGrid = () => {
    const dispatch = useDispatch();

    const { thumbsDownImages } = useSelector((state: RootState) => state.images);
    return (
        <StyledRow>
            {thumbsDownImages.map((image, index) => {
                return (
                    <Col key={index} sm={6} md={4}>
                        <Image image={image} canBeToggled={false} />
                        <ButtonContainer>
                            <Button variant="success" onClick={() => dispatch({type: THUMBS_UP_IMAGE, payload: image})}>Yaaay!</Button>
                        </ButtonContainer>
                    </Col>
                )
            })}
        </StyledRow>
    )
}

export default ThumbsDownGrid
