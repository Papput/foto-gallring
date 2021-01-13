import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import useGetImages from '../../hooks/useGetImages';
import Image from './Image';

const StyledRow = styled(Row)`
    padding-top: 1rem;
`;

type props = {
    albumId: string;
}

const ImageGrid: FC<props> = ({albumId}) => {
    const { images } = useGetImages(albumId);
    return (
        <StyledRow>
            {images.map((image, index) => {
                return (
                    <Col key={index} sm={6} md={4}>
                        <Image imageUrl={image.url} />
                    </Col>
                )
            })}
        </StyledRow>
    )
}

export default ImageGrid
