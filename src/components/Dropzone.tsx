import React, { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components';

const DropZoneDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid #ced4da;
    padding: 2rem;
    height: 10rem;
    border-radius: 0.25rem;
`
type props = {
    className?: string;
    setImages: Dispatch<SetStateAction<File[]>>
}
const Dropzone: FC<props> = ({className, setImages}) => {
    const onDrop = useCallback( (acceptedFiles: File[]) => {
        setImages(prev => [...prev, ...acceptedFiles]);
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <DropZoneDiv className={className} {...getRootProps()}>
            <input {...getInputProps()} />
            {
            isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </DropZoneDiv>
    )
}

export default Dropzone
