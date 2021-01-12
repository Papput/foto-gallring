import { createAction, createReducer } from "@reduxjs/toolkit";

export const ADD_FILES = 'ADD_FILES';
export const DELETE_FILE = 'DELETE_FILE';

const addFile = createAction(ADD_FILES, (files: File[]) => {
    console.log('add file', files);
    return { payload: files }
})
const deleteFile = createAction(DELETE_FILE, (file: File) => {
    return { payload: file }
})

interface AddFileAction {
    type: typeof ADD_FILES;
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
        state.files = [...state.files, ...action.payload];
    });
    builder.addCase(deleteFile, (state, action) => {
        state.files = [...state.files].filter(file => file !== action.payload);
    });
})

export default albumReducer;