import React, { useEffect, useState } from 'react'
import { Alert, Col, FormControl, InputGroup, ProgressBar, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import firebase, { db } from '../../firebase';
import useUploadImages from '../../hooks/useUploadImages';
import Dropzone from '../Dropzone';
import Image from './Image';

const StyledRow = styled(Row)`
    padding-top: 1rem;
`;

type AlbumData = {
    owner?: string;
    title?: string;
}
const CreateAlbum = () => {
    const { uploadProgress, status} = useUploadImages();
    const { albumId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [album, setAlbum] = useState<firebase.firestore.DocumentData & AlbumData>();
    const [images, setImages] = useState<File[]>([]);

    useEffect(() => {
        console.log(albumId)
        const getAlbum = async () => {
            try {
                const albumRef = db.collection('albums').doc(albumId);
                
                const albumData = (await albumRef.get()).data();
                if(!albumData) {
                    return navigate('/');
                }
                setAlbum(albumData)
            } catch(err) {
                console.log('error:', err);
                navigate('/');
            }

            setLoading(false);
        }
        getAlbum()
    }, [albumId]);

    if(loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {album?.title && <h1>{album.title}</h1>}
            <Dropzone  setImages={setImages} />
            {uploadProgress !== null && <ProgressBar variant="success" animated now={uploadProgress} /> }

            {status && <Alert variant={status.type}>{status.message}</Alert>}
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
