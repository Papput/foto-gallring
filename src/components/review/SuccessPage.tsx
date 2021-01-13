import React from 'react'
import styled from 'styled-components';

const PartySpan = styled.span`
    font-size: 5rem;
    display: flex;
    justify-content: center;
`;
const PartyMessage = styled.p`
    font-size: 4rem;
    text-align: center;
`;

const SuccessPage = () => {
    return (
        <div>
            <PartySpan>
                🎉
            </PartySpan>
            <PartyMessage>Thank you for reviewing the album!</PartyMessage>
        </div>
    )
}

export default SuccessPage
