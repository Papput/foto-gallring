import React from 'react'
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { THUMBS_DOWN_IMAGE } from '../../store/imagesReducer';
import { RootState } from '../../store/rootReducer';
import Image from '../album/Image';

const StyledRow = styled(Row)`
    padding-top: 1rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-start;
`;

const ThumbsUpGrid = () => {
    const dispatch = useDispatch();

    const { thumbsUpImages } = useSelector((state: RootState) => state.images);
    return (
        <StyledRow>
            {thumbsUpImages.map((image, index) => {
                return (
                    <Col className={"mb-5"} key={index} sm={6} md={4}>
                        <Image image={image} canBeToggled={false} />
                        <ButtonContainer>
                            <Button variant="danger" onClick={() => dispatch({type: THUMBS_DOWN_IMAGE, payload: image})}>Buuuu!</Button>
                        </ButtonContainer>
                    </Col>
                )
            })}
        </StyledRow>
    )
}

export default ThumbsUpGrid
