import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import useSendReview from '../../hooks/useSendReview';

const SendReviewButton = styled(Button)`
    width: 100%;
    font-size: 3rem;
    margin-top: 2rem;
`;


const SendReview = () => {
    const { sendReview, isSuccess } = useSendReview();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(isSuccess) {
            navigate('/success')
        }
    }, [isSuccess])
    return (
        <>
            <SendReviewButton onClick={sendReview}>
                Send images!
            </SendReviewButton>
        </>
    )
}

export default SendReview
