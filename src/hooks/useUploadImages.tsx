import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { db, storage } from '../firebase';
import { RootState } from '../store/rootReducer';
import { ADD_IMAGES_UPLOADED, CLEAR_ERROR, CLEAR_FILES_UPLOADED, CLEAR_STATUS, EDIT_ERROR, EDIT_STATUS, TOTAL_IMAGES, UPDATE_PROGRESS } from '../store/uploadImagesReducer';

export type ImageQueryData = {
    name: string;
    size: number;
    type: string;
    path: string;
    url: string;
    albums: string[];
}


type Type = 'error' | 'warning' | 'success';

export interface MessageObj {
    message: string;
    type: Type;
}

const useUploadImages = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state: RootState) => state.firebase.auth);
    const { albumId } = useParams();
    
    const uploadImages = async (files: File[]) => {
        dispatch({ type: CLEAR_ERROR});
        dispatch({ type: CLEAR_STATUS});
        dispatch({ type: CLEAR_FILES_UPLOADED});

        dispatch({ type: TOTAL_IMAGES, payload: files.length})

        files.forEach((file, index) => {
            try {
                const fileRef = storage.ref(`images/${auth.uid}/${file.name}`)

                const uploadTask = fileRef.put(file);

                uploadTask.on('state_changed', taskSnapshot => {
                    const progress = Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100)
                    dispatch({
                        type: UPDATE_PROGRESS,
                        payload: progress
                    })
                });

                uploadTask.then(snapshot => {
                    dispatch({type: ADD_IMAGES_UPLOADED})
                    
                    snapshot.ref.getDownloadURL().then(url => {
                        
                        const image = {
                            name: file.name,
                            path: snapshot.ref.fullPath,
                            size: file.size,
                            type: file.type,
                            albums: [`albums/${albumId}`],
                            url,
                        };
                        
                        db.collection('images').add(image)
                    });
                })

            } catch (err) {
                console.error("File upload triggered an error!", err);
                dispatch({
                    type: EDIT_ERROR,
                    payload: err
                })

                dispatch({
                    type: EDIT_STATUS,
                    payload: {
                        type: "warning",
                        message: `Image could not be uploaded due to an error (${err.code})`
                    }
                })
            }
        })
    }

    return { uploadImages }
}

export default useUploadImages
