import React, { useEffect, useState } from 'react'
import { Alert, Col, ProgressBar, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import firebase, { db } from '../../firebase';
import { RootState } from '../../store/rootReducer';
import Dropzone from '../Dropzone';
import Image from './Image';

const StyledRow = styled(Row)`
    padding-top: 1rem;
`;

type AlbumData = {
    owner?: string;
    title?: string;
}
const UploadImagesToAlbum = () => {
    const { albumId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [album, setAlbum] = useState<firebase.firestore.DocumentData & AlbumData>();
    const { totalImages, imagesUploaded} = useSelector((state: RootState) => state.uploadImages);
    const [images, setImages] = useState<File[]>([]);

    const {uploadProgress, status} = useSelector((state: RootState) => state.uploadImages);
    
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
            <Dropzone />
            {uploadProgress !== null && <ProgressBar variant="success" animated now={uploadProgress} /> }

            {status && <Alert variant={status.type}>{status.message}</Alert>}
            {totalImages && <Alert variant={'success'}>{imagesUploaded} / {totalImages} images successfully uploaded!</Alert>}
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

export default UploadImagesToAlbum;
