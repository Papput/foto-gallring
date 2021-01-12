import React, { FC } from 'react'
import { Card } from 'react-bootstrap';
import styled from 'styled-components';

type Props = {
    file: File,
}

const CardImageContainer = styled(Card)`
    margin-bottom: 1rem;
`;

const Image: FC<Props> = ({ file }) => {
    return (
        <CardImageContainer>
            <Card.Img variant="top" src={URL.createObjectURL(file) || "https://via.placeholder.com/150"} />
            <Card.Body>
                <Card.Title>{file.name}</Card.Title>
                <Card.Text>{file.size} bytes</Card.Text>
                <Card.Text>{file.type}</Card.Text>
            </Card.Body>
        </CardImageContainer>
    )
}

export default Image;
