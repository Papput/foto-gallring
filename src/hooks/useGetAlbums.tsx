import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { RootState } from "../store/rootReducer";

interface Album {
    id: string; 
    owner: string;
    title: string;
    thumbNailUrl?: string;
    date?: string;
}

const useGetAlbums = () => {
    const [albums, setAlbums] = useState<Album[]>([]);
    const auth = useSelector((state: RootState) => state.firebase.auth);
    
    useEffect(() => {
        return db.collection("albums").where("owner", "==", `${auth.uid}`).onSnapshot(snapShot => {
            setAlbums([])
            snapShot.forEach(doc => {
                const albumData = {
                    id: doc.id,
                    ...doc.data()
                } as Album;
                
                setAlbums(prev => [...prev, {...albumData}])
            })
        })
    }, [auth.uid])

    return { albums }
};

export default useGetAlbums;