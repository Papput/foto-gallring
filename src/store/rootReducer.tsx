import { combineReducers } from '@reduxjs/toolkit';
import { firebaseReducer } from 'react-redux-firebase'

import albumReducer from './albumReducer';
import imagesReducer from './imagesReducer';
import uploadImagesReducer from './uploadImagesReducer';
const reducers = {
    firebase: firebaseReducer,
    uploadImages: uploadImagesReducer,
    images: imagesReducer,
}

const rootReducer = combineReducers(reducers)
export type RootState = InferRootState<typeof reducers>
export default rootReducer;


/**
 * Typescript fix, firebase infers as any/unkown
 * https://stackoverflow.com/questions/59768923/combinereducers-doesnt-infer-type
 */
type BaseReducerMap<S> = {
    [K in keyof S]: (state: S[K], action: any) => S
}

export type InferRootState<ReducerMap extends BaseReducerMap<S>, S = any> = {
    [K in keyof ReducerMap]: ReturnType<ReducerMap[K]>
}
