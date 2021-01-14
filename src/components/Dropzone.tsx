import React, { FC, useCallback } from 'react'
import { Alert, ProgressBar } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import useUploadImages from '../hooks/useUploadImages';
import { RootState } from '../store/rootReducer';

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
}
const Dropzone: FC<props> = ({className}) => {
    const { uploadImages, uploadProgress, status, totalImages, imagesUploaded } = useUploadImages();

    const onDrop = useCallback( (acceptedFiles: File[]) => {
        uploadImages(acceptedFiles)
    }, [uploadImages])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: 'image/jpeg, image/png'})

    return (
        <>
            <DropZoneDiv className={className} {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </DropZoneDiv>
            {uploadProgress !== null && <ProgressBar variant="success" animated now={uploadProgress} /> }

            {status && <Alert variant={status.type}>{status.message}</Alert>}
            {totalImages && <Alert variant={'success'}>{imagesUploaded} / {totalImages} images successfully uploaded!</Alert>}     
        </>
    )
}

export default Dropzone
