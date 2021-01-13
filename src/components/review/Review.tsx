import React from 'react'
import { useParams } from 'react-router-dom';
import ReviewGrid from './ReviewGrid';
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox";
import ThumbsDownGrid from './ThumbsDownGrid';
import ThumbsUpGrid from './ThumbsUpGrid';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import useGetImages from '../../hooks/useGetImages';

const GridArea = styled.div`
    padding: 4rem 0rem;
    border-bottom: ${((props: { border: boolean}) => props.border ? "2px solid black" : "none")};
`

const GridTitle = styled.h2`

`;
const callbacks = {
    onSlideChange: object => console.log('onSlideChange',object),
    onLightboxOpened: object => console.log('onLightboxOpened', object),
    onLightboxClosed: object => console.log('onLightboxClosed', object),
    onCountSlides: object => console.log('onCountSlides', object)
};

const Review = () => {
    const {albumId} = useParams();
    useGetImages(albumId);
    const { images, thumbsUpImages, thumbsDownImages } = useSelector((state: RootState) => state.images);
    return (
        <div>

            {images.length > 0 && 
                <SimpleReactLightbox>
                    <GridArea border={true} >
                        <GridTitle>Please pick images you want to keep</GridTitle>
                        <SRLWrapper callBakcs={callbacks} >
                            <ReviewGrid albumId={albumId} />
                        </SRLWrapper>
                    </GridArea>
                </SimpleReactLightbox>
            }
            
            
            {thumbsUpImages.length > 0 && 
                <SimpleReactLightbox>
                    <GridArea border={true}>
                        <GridTitle>I want to keep these images</GridTitle>
                        <SRLWrapper>
                            <ThumbsUpGrid />            
                        </SRLWrapper>
                    </GridArea>
                </SimpleReactLightbox>
            }

            {thumbsDownImages.length > 0 &&   
                <SimpleReactLightbox>
                    <GridArea border={false}>
                        <GridTitle>I want to keep remove these images</GridTitle>
                        <SRLWrapper>
                            <ThumbsDownGrid />
                        </SRLWrapper>
                    </GridArea>
                </SimpleReactLightbox>
            }

        </div>
    )
}

export default Review
