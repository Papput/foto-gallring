import React, { useEffect, useRef, useState } from 'react'
import { Button, Overlay, Tooltip } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import firebase, { db } from '../../firebase';
import { RootState } from '../../store/rootReducer';
import Dropzone from '../Dropzone';
import ImageGrid from './ImageGrid';
import styled from 'styled-components';
import { selectedImagesSelector } from '../../store/imagesReducer';
import CreateAlbumWithImages from './CreateAlbumWithImages';
import {FaRegTrashAlt} from "react-icons/fa"
import {BiClipboard} from "react-icons/bi"
import useDeleteAlbum from '../../hooks/useDeleteAlbum';


const StyledCreateAlbumWithImages = styled(CreateAlbumWithImages)`
    margin-top: 1rem;
`;

const AlbumTitle = styled.input`
    border: none;
    font-size: 2rem;
    margin-bottom: 1rem;
`;

const FormContainer = styled.div`
    display: flex;
    padding: 1rem 0rem;
`;

const ClipBoardIco = styled(BiClipboard)`
    font-size: 2rem;
    cursor: pointer;
    margin-right: 0.25rem;
`
const ClipBoardButton = styled(Button)`
    display: flex;
    align-items: center;
    cursor: pointer;
`
const TrashIcon = styled(FaRegTrashAlt)`
    font-size: 2rem;
    cursor: pointer;
    margin: 1rem 0.25rem 0.5rem auto;
`

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
    const selectedImages = useSelector(selectedImagesSelector);
    const { images } = useSelector((state: RootState) => state.images);
    const { deleteAlbum } = useDeleteAlbum();

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

    const handleDelete = async (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();

        try {
            await deleteAlbum(albumId);
            navigate('/');

        } catch (err) {
            console.log('Error when deleting album ' + albumId)
        }
    }

    if(loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            
            <FormContainer>
                {images.length !== 0 &&( 
                    <>
                        <ClipBoardButton ref={copyButtonRef} variant="outline-info" onClick={handleReviewClick}>
                            <ClipBoardIco />
                            Get review link
                        </ClipBoardButton>
                        <Overlay target={copyButtonRef.current} show={show} placement="bottom">
                            {(props) => (
                                <Tooltip id="overlay-example" {...props}>
                                    {process.env.REACT_APP_REVIEW_PATH}${albumId} copied to clipboard
                                </Tooltip>
                            )}
                        </Overlay>
    
                    </>
                )}
                <TrashIcon onClick={(e) => handleDelete(e)} />
            </FormContainer>
                {album?.title && 
                    <form onSubmit={e => handleSubmit(e)}>
                        <AlbumTitle ref={inputRef} defaultValue={album.title} />
                    </form>
                }
            <Dropzone />
            {selectedImages.length > 0 && <StyledCreateAlbumWithImages />}
            <ImageGrid albumId={albumId} />
        </div>
    )
}

export default UploadImagesToAlbum;
