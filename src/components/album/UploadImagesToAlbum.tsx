import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Overlay, ProgressBar, Tooltip } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import firebase, { db } from '../../firebase';
import { RootState } from '../../store/rootReducer';
import Dropzone from '../Dropzone';
import ImageGrid from './ImageGrid';
import styled from 'styled-components';
import { selectedImagesSelector } from '../../store/imagesReducer';
import CreateAlbumWithImages from './CreateAlbumWithImages';

const StyledCreateAlbumWithImages = styled(CreateAlbumWithImages)`
    margin-top: 1rem;
`;

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
    const [show, setShow] = useState(false);
    const [album, setAlbum] = useState<firebase.firestore.DocumentData & AlbumData>();
    const {uploadProgress, status} = useSelector((state: RootState) => state.uploadImages);
    const selectedImages = useSelector(selectedImagesSelector);
    const { totalImages, imagesUploaded} = useSelector((state: RootState) => state.uploadImages);
    const { images } = useSelector((state: RootState) => state.images);
    
    const inputRef = useRef<HTMLInputElement>();
    const copyButtonRef = useRef(null);
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

    const handleReviewClick = () => {
        setShow(prev => !prev);
        navigator.clipboard.writeText(`${process.env.REACT_APP_REVIEW_PATH}${albumId}`)
    };

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
            
            {images.length !== 0 &&( 
                <>
                    <Button ref={copyButtonRef} variant="primary" onClick={handleReviewClick}>Get review link</Button>
                    <Overlay target={copyButtonRef.current} show={show} placement="bottom">
                        {(props) => (
                            <Tooltip id="overlay-example" {...props}>
                                {process.env.REACT_APP_REVIEW_PATH}${albumId} copied to clipboard
                            </Tooltip>
                        )}
                    </Overlay>

                </>
            )}
            {selectedImages.length > 0 && <StyledCreateAlbumWithImages />}
            <ImageGrid albumId={albumId} />
        </div>
    )
}

export default UploadImagesToAlbum;
