import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { db } from '../firebase';
import { selectedImagesSelector } from '../store/imagesReducer';
import { RootState } from '../store/rootReducer';

const useCreateAlbum = () => {
    const auth = useSelector((state: RootState) => state.firebase.auth);
    const selectedImages = useSelector(selectedImagesSelector);
    const navigate = useNavigate();
    const [error, setError] = useState<null | string>(null)

    const createNewAlbum = async (albumName: string) => {
        setError(null);
        console.log('Wanna create new album')
        if(!albumName) return;
        if(albumName.length < 2) {
            setError('Album length must contain at least 2 letters')
        }

        try {
            const albumRef = await db.collection("albums").add({
                title: albumName,
                owner: auth.uid,
            })

            selectedImages.forEach(image => {
                db.collection('images').doc(image.id).set({
                    albums: [...image.albums, `albums/${albumRef.id}`]
                }, { merge: true })
            });

            navigate(`/album/${albumRef.id}`);
            
        } catch (err) {
            setError(err.message);
        }
    } 
    return { error, createNewAlbum }
}

export default useCreateAlbum
