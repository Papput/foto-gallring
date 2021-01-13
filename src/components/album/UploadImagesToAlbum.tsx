import React, { useEffect, useRef, useState } from 'react'
import { Alert, ProgressBar } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import firebase, { db } from '../../firebase';
import { RootState } from '../../store/rootReducer';
import Dropzone from '../Dropzone';
import ImageGrid from './ImageGrid';
import styled from 'styled-components';

const AlbumTitle = styled.input`
    border: none;
    font-size: 2rem;
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
    const {uploadProgress, status} = useSelector((state: RootState) => state.uploadImages);
    const { totalImages, imagesUploaded} = useSelector((state: RootState) => state.uploadImages);

    const inputRef = useRef<HTMLInputElement>();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(inputRef.current.value.length < 2) return;
        db.collection('albums').doc(albumId).set({
            title: inputRef.current.value
        }, { merge: true })
    }
    
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
    }, [albumId, navigate]);

    if(loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            
            {album?.title && 
                <form onSubmit={e => handleSubmit(e)}>
                    <AlbumTitle ref={inputRef} defaultValue={album.title} />
                </form>
            }
            <Dropzone />
            {uploadProgress !== null && <ProgressBar variant="success" animated now={uploadProgress} /> }

            {status && <Alert variant={status.type}>{status.message}</Alert>}
            {totalImages && <Alert variant={'success'}>{imagesUploaded} / {totalImages} images successfully uploaded!</Alert>}
            
            <ImageGrid albumId={albumId} />
        </div>
    )
}

export default UploadImagesToAlbum;
