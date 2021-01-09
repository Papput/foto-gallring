import React, { FC, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components';

const DropZoneDiv = styled.div`
    background-color: #aaa;
    padding: 2rem;
    height: 10rem;
    border-radius: 1rem;
`
type props = {
    className?: string;
}
const Dropzone: FC<props> = ({className}) => {

    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
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
