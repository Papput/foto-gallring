import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { db, storage } from '../firebase';
import { RootState } from '../store/rootReducer';

export type ImageQueryData = {
    id: string;
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
    const auth = useSelector((state: RootState) => state.firebase.auth);
    const [uploadProgress, setUploadProgress] = useState(null);
    const [uploadedImages, setUploadedImages] = useState<ImageQueryData[]>(null);
    const [status, setStatus] = useState<MessageObj>(null);
    const [error, setError] = useState<string>(null);
    
    const uploadImages = async (files: File[], albumId: string) => {
        files.forEach((file, index) => {
            try {
                const fileRef = storage.ref(`images/${auth.uid}/${file.name}`)

                const uploadTask = fileRef.put(file);

                uploadTask.on('state_changed', taskSnapshot => {
                    setUploadProgress(Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100));
                });

                uploadTask.then(snapshot => {
                    setStatus({
                        type: 'success', 
                        message: `Image ${index+1} / ${files.length} successfully uploaded`
                    });
                    setUploadProgress(null);
        
                    snapshot.ref.getDownloadURL().then(url => {
                        
                        const image = {
                            id: file.name,
                            name: file.name,
                            path: snapshot.ref.fullPath,
                            size: file.size,
                            type: file.type,
                            albums: [`albums/${albumId}`],
                            url,
                        };
        
                        setUploadedImages(prev => [...prev, image]);
                    });
                })

            } catch (err) {
                console.error("File upload triggered an error!", err);
                setError(err);
                setStatus({
                    type: "warning",
                    message: `Image could not be uploaded due to an error (${err.code})`
                });
            }
        })

        if(uploadedImages) {
            uploadedImages.forEach(image => {
                db.collection('images').add(image)
            })
        }
    }

    return { uploadProgress, error, uploadImages, uploadedImages, status }
}

export default useUploadImages
