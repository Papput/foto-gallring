import React, { useRef, useState } from 'react'
import { Alert, Button, Form, InputGroup } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { db } from '../../firebase';
import { RootState } from '../../store/rootReducer';

import { useNavigate } from 'react-router-dom'
 
// const  = styled.div`
//     margin-top: 1rem;
// `
const CreateAlbum = () => {
    const navigate = useNavigate();
    const auth = useSelector((state: RootState) => state.firebase.auth);
    const albumImputRef = useRef<HTMLInputElement>();
    const [error, setError] = useState<null | string>(null)
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError(null);
        console.log('Wanna create new album')
        if(!albumImputRef.current) return;
        if(albumImputRef.current.value.length < 2) {
            setError('Album length must contain at least 2 letters')
        }

        try {
            const albumRef = await db.collection("albums").add({
                title: albumImputRef.current.value,
                owner: auth.uid,
            })

            navigate(`album/${albumRef.id}`);
            
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div>
            <Form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)} >
                <Form.Label htmlFor="album-name">Album Name</Form.Label>
                <InputGroup className="mb-3">
                    <Form.Control ref={albumImputRef} id="album-name" type="text" placeholder="Enter Album name" />
                    <InputGroup.Append>
                        <Button type="submit" variant="outline-secondary">+</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
            {error && <Alert variant={'warning'}>{error}</Alert>}              
        </div>
    )
}

export default CreateAlbum;
