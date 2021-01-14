import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ImageDb } from '../../hooks/useGetImages';
import { RootState } from '../../store/rootReducer';
import Image from '../album/Image';
import ThumbsDownButton from './ThumbsDownButton';
import ThumbsUpButton from './ThumbsUpButton';

const StyledRow = styled(Row)`
    padding-top: 1rem;
`;
const VoteContainer = styled.div`
    position: relative;
`;

type props = {
    albumId: string;
}

const ReviewGrid: FC<props> = () => {
    const { images } = useSelector((state: RootState) => state.images);
    
    return (
        <StyledRow>
            {images.map((image: ImageDb, index) => {
                return (
                    <Col className={"mb-5"} key={index} sm={6} md={4}>
                        <VoteContainer>
                            <Image image={image} canBeToggled={false} />
                            <ThumbsDownButton image={image}  />
                            <ThumbsUpButton image={image} />
                        </VoteContainer>
                    </Col>
                )
            })}
        </StyledRow>
    )
}

export default ReviewGrid
