import { createAction, createReducer } from "@reduxjs/toolkit";
import { ImageDb } from "../hooks/useGetImages";

export const ADD_FILE = 'ADD_FILE';
export const DELETE_FILE = 'DELETE_FILE';

const addFile = createAction(ADD_FILE, (image: ImageDb) => {
    console.log('add file', image);
    return { payload: image }
})
const deleteFile = createAction(DELETE_FILE, (file: File) => {
    return { payload: file }
})

interface AddFileAction {
    type: typeof ADD_FILE;
    payload: File[];
}

interface DeleteFileAction {
    type: typeof DELETE_FILE;
    payload: File;
}

export type FileActionTypes = AddFileAction | DeleteFileAction

type AlbumState = {
    files: File[],
}

const initalState: AlbumState = {
    files: [],
};

const albumReducer = createReducer(initalState, (builder) => {
    
    builder.addCase(addFile, (state, action) => {
        console.log('action.payload', action.payload);
        state.files = [];
    });
    builder.addCase(deleteFile, (state, action) => {
        state.files = [...state.files].filter(file => file !== action.payload);
    });
})

export default albumReducer;