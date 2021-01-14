import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/rootReducer';
import Image from '../album/Image';
import ThumbsDownButton from './ThumbsDownButton';

const StyledRow = styled(Row)`
    padding-top: 1rem;
`;

const VoteContainer = styled.div`
    position: relative;
`;

const ThumbsUpGrid = () => {

    const { thumbsUpImages } = useSelector((state: RootState) => state.images);
    return (
        <StyledRow>
            {thumbsUpImages.map((image, index) => {
                return (
                    <Col className={"mb-5"} key={index} sm={6} md={4}>
                        <VoteContainer>
                            <Image image={image} canBeToggled={false} />
                            <ThumbsDownButton image={image}  />
                        </VoteContainer>
                    </Col>
                )
            })}
        </StyledRow>
    )
}

export default ThumbsUpGrid
