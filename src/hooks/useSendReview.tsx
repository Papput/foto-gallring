import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { db } from '../firebase';
import { RootState } from '../store/rootReducer';

const useSendReview = () => {
    const [ error, setError ] = useState<string>(null);
    const { images, thumbsUpImages } = useSelector((state: RootState) => state.images);
    const navigate = useNavigate();

    const sendReview = async (albumId: string ) => {

        if(images.length !== 0 && thumbsUpImages.length === 0) {
            return setError('All images must be reviewed, and at least one must thumbed up');
        }

        try {
            const albumRef = db.collection("albums").doc(albumId);
            const albumDoc = await albumRef.get();
            const albumData = albumDoc.data();

            const date = new Date().toUTCString();
            //Create Album
            const newAlbumRef = await db.collection("albums").add({
                owner: albumData.owner,
                date: date,
                title: albumData.title,
            })

            // Add Upvoted images to album
            thumbsUpImages.forEach(image => {
                db.collection("images").doc(image.id).set({
                    albums: [...image.albums, `albums/${newAlbumRef.id}`],
                }, { merge: true })
            });

            navigate('/success');

        } catch (err) {
            setError(err.message);
        }
    }

    return { sendReview, error };
}

export default useSendReview
