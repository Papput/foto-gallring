import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../store/rootReducer';
import Image from '../album/Image';
import ThumbsUpButton from './ThumbsUpButton';

const StyledRow = styled(Row)`
    padding-top: 1rem;
`;

const VoteContainer = styled.div`
    position: relative;
`;

const ThumbsDownGrid = () => {

    const { thumbsDownImages } = useSelector((state: RootState) => state.images);
    return (
        <StyledRow>
            {thumbsDownImages.map((image, index) => {
                return (
                    <Col className={"mb-5"} key={index} sm={6} md={4}>
                        <VoteContainer>
                            <Image image={image} canBeToggled={false} />
                            <ThumbsUpButton image={image} />
                        </VoteContainer>
                    </Col>
                )
            })}
        </StyledRow>
    )
}

export default ThumbsDownGrid
