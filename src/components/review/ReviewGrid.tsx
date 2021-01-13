import React, { FC } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useGetImages from '../../hooks/useGetImages';
import { THUMBS_DOWN_IMAGE, THUMBS_UP_IMAGE } from '../../store/imagesReducer';
import { RootState } from '../../store/rootReducer';
import Image from '../album/Image';

const StyledRow = styled(Row)`
    padding-top: 1rem;
`;
const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

type props = {
    albumId: string;
}

const ReviewGrid: FC<props> = () => {
    const dispatch = useDispatch();

    const { images } = useSelector((state: RootState) => state.images);
    
    return (
        <StyledRow>
            {images.map((image, index) => {
                return (
                    <Col key={index} sm={6} md={4}>
                        <Image image={image} canBeToggled={false} />
                        <ButtonContainer>
                            <Button variant="danger" onClick={() => dispatch({type: THUMBS_DOWN_IMAGE, payload: image})}>Buuuu!</Button>
                            <Button variant="success" onClick={() => dispatch({type: THUMBS_UP_IMAGE, payload: image})}>Yaaay!</Button>
                        </ButtonContainer>
                    </Col>
                )
            })}
        </StyledRow>
    )
}

export default ReviewGrid
