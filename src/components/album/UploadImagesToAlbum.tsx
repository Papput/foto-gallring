import React, { useState } from 'react'
import { Col, FormControl, InputGroup, Row } from 'react-bootstrap';
import styled from 'styled-components';
import Dropzone from '../Dropzone';
import Image from './Image';

const StyledRow = styled(Row)`
    padding-top: 1rem;
`;
const CreateAlbum = () => {
    const [images, setImages] = useState<File[]>([])
    return (
        <div>
            <h1>Create Album</h1>
            <Dropzone  setImages={setImages} />

            <StyledRow>
                {images.map(image => {
                    return (
                        <Col sm={6} md={4}>
                            <Image file={image} />
                        </Col>
                    )
                })}
            </StyledRow>
        </div>
    )
}

export default CreateAlbum;
