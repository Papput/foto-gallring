import { useState } from 'react'
import { db, storage } from '../firebase'
import { ImageDb } from './useGetImages';

const useRemoveImageFromAlbum = () => {
    const [error, setError] = useState<string>(null);
    const removeAllImagesFromAlbum = async (albumId: string) => {
        setError(null);
        try {
            const imagesInAlbum = await db.collection("images").where('albums', 'array-contains', `albums/${albumId}`).get();

            imagesInAlbum.forEach(async doc => {
                const docRef = doc.ref;
                const docData = {
                    ...doc.data(),
                    id: docRef.id
                } as ImageDb

                //remove album from array
                const filteredAlbums = docData.albums.filter((album) => album !== `albums/${albumId}`)

                //delete image if array is empty
                if(filteredAlbums.length === 0) {
                    const storageRef = storage.ref();

                    storageRef.child(docData.path).delete();
                    docRef.delete();

                } else {
                    //else replace albums array with new filtered array
                    docRef.set({
                        albums: filteredAlbums,
                    }, { merge: true })
                }
            });
        } catch(err) {
            setError(err.message)
        }
    }

    const removeImageFromAlbum = async (albumId: string, imageId: string) => {
        setError(null);
        try {
            const image = await db.collection("images").doc(imageId).get();

            const imageRef = image.ref;

            const imageData = {
                ...image.data(),
                id: imageRef.id
            } as ImageDb

            //remove album from array
            const filteredAlbums = imageData.albums.filter((album) => album !== `albums/${albumId}`)

            //delete image if array is empty
            if(filteredAlbums.length === 0) {
                const storageRef = storage.ref();

                storageRef.child(imageData.path).delete();
                imageRef.delete();

            } else {
                //else replace albums array with new filtered array
                imageRef.set({
                    albums: filteredAlbums,
                }, { merge: true })
            }
        } catch(err) {
            setError(err.message)
        }
    }

    return { removeAllImagesFromAlbum, removeImageFromAlbum, error }
}

export default useRemoveImageFromAlbum
