import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Container, Divider, Notification } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
    const navigate = useNavigate();
    const [hasNewInvite, setHasNewInvite] = useState(false); // Mocking it for now
    const hostedEvents = []; // Fetch these from your API
    const participatingEvents = []; // Fetch these from your API

    useEffect(() => {
        // Check if the user has a new invite and set 'hasNewInvite'
        // setHasNewInvite(true or false based on the API call)
    }, []);

    return (
        <Container maxWidth="lg" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px' }}>
            
            {hasNewInvite && (
                <Notification 
                    message="You have been invited to attend an event." 
                    onClose={() => setHasNewInvite(false)} 
                    onClick={() => navigate('/selecttimes')} 
                />
            )}

            <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="2rem">
                <Typography variant="h4">Home</Typography>
                <Button variant="contained" color="primary" onClick={() => navigate('/createevent')}>
                    + Create new event
                </Button>
            </Box>

            <Divider marginBottom="2rem" />

            <Box display="flex" justifyContent="space-between">
                <Box flex="1" marginRight="1rem">
                    <Typography variant="h5" marginBottom="1rem">Hosting</Typography>
                    {/* Render the hosted events */}
                    {hostedEvents.map(event => (
                        <Box key={event.id}>
                            {event.name}
                        </Box>
                    ))}
                </Box>

                <Box flex="1">
                    <Typography variant="h5" marginBottom="1rem">Participating</Typography>
                    {/* Render the participating events */}
                    {participatingEvents.map(event => (
                        <Box key={event.id}>
                            {event.name}
                        </Box>
                    ))}
                </Box>
            </Box>
        </Container>
    );
}
