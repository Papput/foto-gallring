import React, { useRef } from 'react'
import { Alert, Button, Form, InputGroup } from 'react-bootstrap';
import { FcStackOfPhotos } from "react-icons/fc";

import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import useCreateAlbum from '../../hooks/useCreateAlbum';

const StackOfPhotos = styled(FcStackOfPhotos)`
    width: 32px;
    height: 32px;
`;
const AlbumInputField = styled(Form.Control)`
    height: auto;
`;

const CreateAlbum = () => {
    const navigate = useNavigate();
    const albumImputRef = useRef<HTMLInputElement>();
    const {error, createNewAlbum} = useCreateAlbum();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const albumId = await createNewAlbum(albumImputRef.current.value);
        if(albumId) {
            navigate(`/album/${albumId}`)
        }
    }

    return (
        <div>
            <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)} >
                <Form.Label htmlFor="album-name">Album Name</Form.Label>
                <InputGroup className="mb-3">
                    <AlbumInputField ref={albumImputRef} id="album-name" type="text" placeholder="Enter Album name" />
                    <InputGroup.Append>
                        <Button type="submit" variant="outline-secondary"><StackOfPhotos /></Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
            {error && <Alert variant={'warning'}>{error}</Alert>}              
        </div>
    )
}

export default CreateAlbum;
