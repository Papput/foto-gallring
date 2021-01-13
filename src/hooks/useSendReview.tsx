import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { db } from '../firebase';
import { RootState } from '../store/rootReducer';
import useDeleteAlbum from './useDeleteAlbum';

const useSendReview = () => {
    const { deleteAlbum, error: deleteAlbumError } = useDeleteAlbum();
    const [ error, setError ] = useState<string>(null);
    const [ isSuccess, setIsSuccess ] = useState<boolean>(null);
    const { images, thumbsUpImages } = useSelector((state: RootState) => state.images);

    useEffect(() => {
        if(deleteAlbumError) {
            setError(deleteAlbumError)
        }
    }, [deleteAlbumError])
    const sendReview = async (albumId: string ) => {

        if(images.length !== 0 && thumbsUpImages.length > 0) {
            return setError('All images must be reviewed, and at least one must thumbed up');
        }

        try {
            const albumRef = await db.collection("albums").doc(albumId).get();
            const albumData = albumRef.data();
            const date = new Date().toDateString();
            //Create Album
            const newAlbumRef = await db.collection("albums").add({
                owner: albumData.owner,
                name: `${albumData.name} ${date}`,
            })

            // Add Upvoted images to album
            thumbsUpImages.forEach(image => {
                db.collection("images").doc(image.id).set({
                    albums: [...image.albums, `albums/${newAlbumRef.id}`],
                }, { merge: true })
            });

            await deleteAlbum(albumId);
            setIsSuccess(true);

        } catch (err) {
            setIsSuccess(false);
            setError(err.message);
        }
    }

    return { sendReview, error, isSuccess, deleteAlbumError };
}

export default useSendReview
