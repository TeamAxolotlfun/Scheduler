import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Container, Divider, Notification } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomePage (props) {
    const {set} = props;
    const navigate = useNavigate();
    const [hasNewInvite, setHasNewInvite] = useState(false); // Mocking it for now
    const [pEvents, setPEvents] = useState([]);
    const [hEvents, setHEvents] = useState([]);
    // const hostedEvents = []; 
    // const participatingEvents = []; 

    useEffect(() => {
        // Check if the user has a new invite and set 'hasNewInvite'
        // setHasNewInvite(true or false)
        const fetchEvents = async () => {
            try{
                const response = await axios.get('http://localhost:3000/userinfo');
                setPEvents(response.data);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchEvents();
        setPEvents([{id: 1, name: 'first event'}, {id: 2, name: 'second event'}]);
    }, []);

    return (
        <Container maxWidth="lg" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px' }}>
            
            {/* {hasNewInvite && (
                <Notification 
                    message="You have been invited to attend an event." 
                    onClose={() => setHasNewInvite(false)} 
                    onClick={() => navigate('/selecttimes')} 
                />
            )} */}

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
                    {hEvents.map(event => (
                        <Box key={event.id}>
                            {event.name}
                        </Box>
                    ))}
                </Box>

                <Box flex="1">
                    <Typography variant="h5" marginBottom="1rem">Participating</Typography>
                    {/* Render the participating events */}
                    {pEvents.map(event => (
                      <Container>
                        <Box key={event.id}>
                            {event.name}
                        </Box>
                        <Button onClick = {() => {
                          set(event);
                          navigate('/selecttimes');
                          }}>
                            Set your availability
                          </Button>
                      </Container>
                    ))}
                </Box>
            </Box>
        </Container>
    );
}
