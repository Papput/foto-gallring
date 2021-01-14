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
        console.log('sending');

        console.log(images, thumbsUpImages);
        if(images.length !== 0 && thumbsUpImages.length === 0) {
            console.log('validation failed')
            return setError('All images must be reviewed, and at least one must thumbed up');
        }

        try {
            console.log(albumId)
            console.log('album Ref')
            const albumRef = db.collection("albums").doc(albumId);
            console.log('album Data')
            const albumDoc = await albumRef.get();
            console.log(albumDoc)
            const albumData = albumDoc.data();
            console.log(albumData)

            console.log('Date')
            const date = new Date().toUTCString();
            console.log(albumRef, albumData, date);
            //Create Album
            const newAlbumRef = await db.collection("albums").add({
                owner: albumData.owner,
                date: date,
                title: albumData.title,
            })

            // Add Upvoted images to album
            thumbsUpImages.forEach(image => {
                console.log('inside forEeach loop')
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
