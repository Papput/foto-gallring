import { createAction, createReducer } from "@reduxjs/toolkit";

type AlbumState = {

}

const initalState: AlbumState = {
};

const getImagesReducer = createReducer(initalState, (builder) => {
    
    // builder.addCase(updateProgress, (state, action) => {
    //     state.uploadProgress = action.payload
    // })

})

export default getImagesReducer;