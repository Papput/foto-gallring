import React, { FC } from 'react'
import { Alert, Button } from 'react-bootstrap';
import styled from 'styled-components';
import useSendReview from '../../hooks/useSendReview';

const SendReviewButton = styled(Button)`
    width: 100%;
    font-size: 3rem;
    margin-top: 2rem;
`;

type Props = {
    albumId: string;
}
const SendReview: FC<Props> = ({albumId}) => {
    const { sendReview, error } = useSendReview();
    return (
        <>
            <SendReviewButton onClick={() => sendReview(albumId)}>
                Send images!
            </SendReviewButton>
            {error && <Alert variant={"danger"}>{error}</Alert>}
        </>
    )
}

export default SendReview
