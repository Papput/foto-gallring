import React, { FC } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { ImageDb } from '../../hooks/useGetImages'
import { THUMBS_UP_IMAGE } from '../../store/imagesReducer'
import { TiThumbsOk } from "react-icons/ti";

const StyledButton = styled(Button)`
    position: absolute;
    bottom: 10%;
    right: 0;
`

const ThumbsUp = styled(TiThumbsOk)`
    font-size: 3rem;
`
type Props = {
    image: ImageDb;
    className?: string;
}

const ThumbsUpButton: FC<Props> = ({className, image}) => {
    const dispatch = useDispatch();
    
    const handleVoteClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch({type: THUMBS_UP_IMAGE, payload: image})
    }

    return (
        <StyledButton variant="outline-success" onClick={(e) => handleVoteClick(e)}><ThumbsUp /></StyledButton>
    )
}

export default ThumbsUpButton
