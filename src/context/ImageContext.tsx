import React, { createContext, useState, useEffect } from 'react';
import firebase, { auth } from '../firebase';

const ImageContext = createContext(null);

export type ContextValues = {
    
}

const ImageContextProvider = ({children}) => {
    

    const contextValues = {
    }
    
    return (
        <ImageContext.Provider value={contextValues}>
            {children}
        </ImageContext.Provider>
    );
}

export {
    ImageContext,
    ImageContextProvider as default
}

