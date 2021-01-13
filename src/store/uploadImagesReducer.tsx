import { createAction, createReducer } from "@reduxjs/toolkit";
import { MessageObj } from "../hooks/useUploadImages";

export const EDIT_STATUS = 'uploadImagesReducer/EDIT_STATUS';
export const CLEAR_STATUS = 'uploadImagesReducer/CLEAR_STATUS';
export const CLEAR_ERROR = 'uploadImagesReducer/CLEAR_ERROR';
export const EDIT_ERROR = 'uploadImagesReducer/EDIT_ERROR';
export const UPDATE_PROGRESS = 'uploadImagesReducer/UPDATE_PROGRESS';
export const CLEAR_PROGRESS = 'uploadImagesReducer/CLEAR_PROGRESS';

export const ADD_IMAGES_UPLOADED = 'uploadImagesReducer/ADD_IMAGES_UPLOADED';
export const TOTAL_IMAGES = 'uploadImagesReducer/TOTAL_IMAGES';
export const CLEAR_FILES_UPLOADED = 'uploadImagesReducer/CLEAR_FILES_UPLOADED';


const editStatus = createAction(EDIT_STATUS, ({ type, message}: MessageObj) => {
    return { payload: {type, message} }
});
const updateProgress = createAction(UPDATE_PROGRESS, (progress: number) => {
    return { payload: progress }
});

const clearStatus = createAction(CLEAR_STATUS);
const clearProgress = createAction(CLEAR_PROGRESS);
const clearError = createAction(CLEAR_ERROR);
const clearFilesUploaded = createAction(CLEAR_FILES_UPLOADED);
const addImagesUploaded = createAction(ADD_IMAGES_UPLOADED);
const totalImages = createAction(TOTAL_IMAGES, (images: number) => {
    return { payload: images}
});


const editError = createAction(EDIT_ERROR, (errorMessage: string) => {
    return { payload: errorMessage }
})

type AlbumState = {
    uploadProgress: number;
    status: MessageObj;
    error: string;
    imagesUploaded: number;
    totalImages: number;
}

const initalState: AlbumState = {
    uploadProgress: null,
    status: null,
    error: null,
    imagesUploaded: 0,
    totalImages: null,
};

const uploadImagesReducer = createReducer(initalState, (builder) => {
    
    builder.addCase(updateProgress, (state, action) => {
        state.uploadProgress = action.payload
    })

    builder.addCase(editStatus, (state, action) => {
        state.status = { 
            type: action.payload.type,
            message: action.payload.message 
        }
    });

    builder.addCase(editError, (state, action) => {
        state.error = action.payload
    })

    builder.addCase(clearStatus, (state) => {
        state.status = null;
    })
    builder.addCase(clearProgress, (state) => {
        state.uploadProgress = null;
    })
    
    builder.addCase(clearError, (state) => {
        state.error = null;
    })

    builder.addCase(addImagesUploaded, (state) => {
        state.imagesUploaded = state.imagesUploaded + 1
    })
    
    builder.addCase(totalImages, (state, action) => {
        state.totalImages = action.payload
    })

    builder.addCase(clearFilesUploaded, (state) => {
        state.totalImages = null;
        state.imagesUploaded = 0;
    })
})

export default uploadImagesReducer;