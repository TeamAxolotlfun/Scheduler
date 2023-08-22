import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Container, Divider, Notification } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

export default function HomePage (props) {
    console.log('props are: ', props);
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
                const response = await axios.get('http://localhost:3000/event/user-invited-events');
                console.log(response.data);
                setPEvents(response.data);
                const response2 = await axios.get('http://localhost:3000/event/organizer-invited-events')
                console.log(response2.data);
                setHEvents(response2.data);
            }
            catch(err){
                console.log(err);
            }
        }
        fetchEvents();
        //setPEvents([{id: 1, name: 'first event'}, {id: 2, name: 'second event'}]);
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
                <Button variant="contained" color="primary" onClick={() => navigate('/event/create-new-event')}>
                    + Create new event
                </Button>
            </Box>

            <Divider marginBottom="2rem" />

            <Box display="flex" justifyContent="space-between">
                <Box flex="1" marginRight="1rem">
                    <Typography variant="h5" marginBottom="1rem">Hosting</Typography>
                    {/* Render the hosted events */}
                    {hEvents.map(event => (
                        <Box key={event.event_id}>
                           {event.event_name}
                        </Box>
                    ))}
                </Box>

                <Box flex="1">
                    <Typography variant="h5" marginBottom="1rem">Participating</Typography>
                    {/* Render the participating events */}
                    {pEvents.map(event => (
                      <Container>
                        <Box key={event.event_id}>
                            {event.event_name}
                        </Box>
                        <Button onClick = {() => {
                          set(event);
                          navigate('/event/select-times');
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
