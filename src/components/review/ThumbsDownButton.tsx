import React, { FC } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import styled from 'styled-components';
import { ImageDb } from '../../hooks/useGetImages'
import { THUMBS_DOWN_IMAGE } from '../../store/imagesReducer';
import { TiThumbsDown } from "react-icons/ti";

const ThumbsDown = styled(TiThumbsDown)`
    font-size: 3rem;
`

const StyledButton = styled(Button)`
    position: absolute;
    bottom: 10%;
`

type Props = {
    image: ImageDb;
    className?: string;
}

const ThumbsDownButton: FC<Props> = ({className, image}) => {
    const dispatch = useDispatch();

    const handleVoteClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        e.stopPropagation();
        e.preventDefault();
        dispatch({type: THUMBS_DOWN_IMAGE, payload: image})
    }
    return (
        <StyledButton variant="outline-danger" onClick={(e) => handleVoteClick(e)}><ThumbsDown /></StyledButton>
    )
}

export default ThumbsDownButton
