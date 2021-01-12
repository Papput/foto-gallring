import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { actionTypes } from 'react-redux-firebase'
import rootReducer from './rootReducer'

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
        ignoredActions: [actionTypes.LOGIN]
    }
  }),
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()