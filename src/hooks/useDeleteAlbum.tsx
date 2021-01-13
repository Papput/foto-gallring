import { useState } from "react";
import { db } from "../firebase";
import useRemoveImageFromAlbum from "./useRemoveImageFromAlbum";

const useDeleteAlbum = () => {
    const [error, setError] = useState<string>(null);
    const { removeAllImagesFromAlbum } = useRemoveImageFromAlbum();
    const deleteAlbum = async (albumId: string) => {
        try {
            //delete album
            await removeAllImagesFromAlbum(albumId)
            await db.collection("albums").doc(albumId).delete();

        } catch (err) {
            setError(err.message);
        }
    }

    return { deleteAlbum, error }
}

export default useDeleteAlbum
