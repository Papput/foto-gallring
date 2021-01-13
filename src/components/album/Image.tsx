import React, { FC } from 'react'
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

type Props = {
    imageUrl: string,
}

const CardImageContainer = styled(Card)`
    margin-bottom: 1rem;
`;

const Image: FC<Props> = ({ imageUrl }) => {
    return (
        <CardImageContainer>
            <Card.Img variant="top" src={imageUrl || "https://via.placeholder.com/150"} />
        </CardImageContainer>
    )
}

export default Image;
