import { useEffect, useState } from "react";
import { db } from "../firebase";

interface Image {
    albums: string[];
    size: number;
    id: string;
    url: string;
    type: string;
    path: string;
    name: string;
}

const useGetImages = (albumId: string) => {
    const [images, setImages] = useState<Image[]>([]);
    
    useEffect(() => {
        console.log('getting images')
        // .where("albums", "array-contains", `albums/${albumId}`)
        return db.collection("images").where("albums", "array-contains", `albums/${albumId}`).onSnapshot(snapShot => {
            setImages([]);
            snapShot.forEach(doc => {
                const imageData = {
                    ...doc.data(),
                    id: doc.id,
                } as Image
                setImages(prev => [...prev, imageData])
            })
        })
    }, [albumId])

    return { images }
};

export default useGetImages;