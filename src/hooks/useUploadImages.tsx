import firebase from 'firebase';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { db, storage } from '../firebase';
import { RootState } from '../store/rootReducer';

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
    const auth = useSelector((state: RootState) => state.firebase.auth);
    const { albumId } = useParams();

    const [uploadProgress , setUploadProgress] = useState<number>(null);
    const [status , setStatus] = useState<MessageObj>(null);
    const [totalImages , setTotalImages] = useState<number>(null);
    const [imagesUploaded , setImagesUploaded] = useState<number>(0);
    const [error , setError] = useState<string>(null);
    
    const uploadImages = async (files: File[]) => {
        setError(null);
        setStatus(null);
        setImagesUploaded(0);
        setTotalImages(files.length);
        setUploadProgress(null);

        files.forEach((file, index) => {
            try {
                const fileRef = storage.ref(`images/${auth.uid}/${file.name}`)

                const uploadTask = fileRef.put(file);

                uploadTask.on('state_changed', taskSnapshot => {
                    const progress = Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100)

                    setUploadProgress(progress)
                });

                uploadTask.then(snapshot => {
                    setImagesUploaded(prev => prev + 1);
                    
                    snapshot.ref.getDownloadURL().then(url => {
                        
                        const image = {
                            name: file.name,
                            path: snapshot.ref.fullPath,
                            size: file.size,
                            type: file.type,
                            albums: [`albums/${albumId}`],
                            url,
                        };

                        //check if image exists
                        db.collection('images').where('path', '==', image.path).get().then(imageDocs => {
                            if(imageDocs.empty) {
                                return db.collection('images').doc().set(image)
                            }
                            
                            imageDocs.forEach(imageDoc => {
                                imageDoc.ref.update({
                                    albums: firebase.firestore.FieldValue.arrayUnion(`albums/${albumId}`)
                                })
                            })
                        })
                    });
                })

            } catch (err) {
                console.error("File upload triggered an error!", err);
                setError(err);
                setStatus({
                    type: "warning",
                    message: `Image could not be uploaded due to an error (${err.code})`
                })
            }
        })
    }

    return { uploadImages, uploadProgress, status, error, totalImages, imagesUploaded }
}

export default useUploadImages
