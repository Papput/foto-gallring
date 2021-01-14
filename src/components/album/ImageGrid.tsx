import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import useGetImages from '../../hooks/useGetImages';
import { RootState } from '../../store/rootReducer';
import Image from './Image';

const StyledRow = styled(Row)`
    padding-top: 1rem;
`;

type props = {
    albumId: string;
}

const ImageGrid: FC<props> = ({albumId}) => {
    useGetImages(albumId);

    const { images } = useSelector((state: RootState) => state.images);
    
    return (
        <StyledRow>
            {images.map((image, index) => {
                return (
                    <Col key={index} sm={6} md={4}>
                        <Image image={image} canBeDeleted={true} />
                    </Col>
                )
            })}
        </StyledRow>
    )
}

export default ImageGrid
