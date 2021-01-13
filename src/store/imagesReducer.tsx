import { createAction, createReducer, createSelector } from "@reduxjs/toolkit";
import { ImageDb } from "../hooks/useGetImages";
import { RootState } from "./rootReducer";

export const ADD_IMAGE = 'imageReducer/ADD_IMAGE_ARRAY';
export const CLEAR_IMAGE_ARRAY = 'imageReducer/CLEAR_IMAGE_ARRAY';
export const TOGGLE_IMAGE = 'imageReducer/TOGGLE_IMAGE';
export const THUMBS_UP_IMAGE = 'imageReducer/THUMBS_UP_IMAGE';
export const THUMBS_DOWN_IMAGE = 'imageReducer/THUMBS_DOWN_IMAGE';

const thumbsUpImage = createAction(THUMBS_UP_IMAGE, (image: ImageDb) => {
    return { payload: image }
})
const thumbsDownImage = createAction(THUMBS_DOWN_IMAGE, (image: ImageDb) => {
    return { payload: image }
})

const addImage = createAction(ADD_IMAGE, (image: ImageDb) => {
    return { payload: image }
})
const toggleImage = createAction(TOGGLE_IMAGE, (image: ImageDb) => {
    return { payload: image }
})

const clearImageArray = createAction(CLEAR_IMAGE_ARRAY);

type AlbumState = {
    images: ImageDb[]
    thumbsUpImages: ImageDb[]
    thumbsDownImages: ImageDb[]
}
const initalState: AlbumState = {
    images: [],
    thumbsUpImages: [],
    thumbsDownImages: [],
};

export const selectedImagesSelector = createSelector((state: RootState) => state.images, (images) => images.images.filter(image => image.selected === true))

const imagesReducer = createReducer(initalState, (builder) => {
    
    builder.addCase(addImage, (state, action) => {
        state.images = [...state.images, action.payload]
    });

    builder.addCase(clearImageArray, (state) => {
        state.images = [];
    });

    builder.addCase(toggleImage, (state, action) => {
        const imageToToggle = state.images.find(image => image.id === action.payload.id)
        imageToToggle.selected = !imageToToggle.selected 
    });

    builder.addCase(thumbsUpImage, (state, action) => {
        state.thumbsUpImages = [...state.thumbsUpImages, action.payload]
        state.thumbsDownImages = state.thumbsDownImages.filter(image => image.id !== action.payload.id)
        state.images = state.images.filter(image => image.id !== action.payload.id)
    });

    builder.addCase(thumbsDownImage, (state, action) => {
        state.thumbsDownImages = [...state.thumbsDownImages, action.payload]
        state.thumbsUpImages = state.thumbsUpImages.filter(image => image.id !== action.payload.id)
        state.images = state.images.filter(image => image.id !== action.payload.id)
    });

})

export default imagesReducer;