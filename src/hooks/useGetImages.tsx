import { useEffect } from "react";
import { db } from "../firebase";
import { ADD_IMAGE, CLEAR_IMAGE_ARRAY } from "../store/imagesReducer";
import { useAppDispatch } from "../store/store";

export interface ImageDb {
    albums: string[];
    size: number;
    id?: string;
    url: string;
    type: string;
    path: string;
    name: string;
    selected: boolean;
}

const useGetImages = (albumId: string) => {
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        return db.collection("images").where("albums", "array-contains", `albums/${albumId}`).onSnapshot(snapShot => {
            dispatch({ type: CLEAR_IMAGE_ARRAY})
            snapShot.forEach(doc => {
                const imageData = {
                    ...doc.data(),
                    id: doc.id,
                    selected: false,
                } as ImageDb
                dispatch({ type: ADD_IMAGE, payload: imageData});
            })
        })
    }, [albumId, dispatch])
};

export default useGetImages;