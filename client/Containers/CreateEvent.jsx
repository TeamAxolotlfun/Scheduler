import React, { useState, useEffect } from 'react';
import TimeSelector from '../Components/TimeSelector.jsx';
import { 
    Box, 
    Button, 
    Container, 
    Typography, 
    InputLabel, 
    FormControl, 
    Select, 
    MenuItem, 
    IconButton,
    TextField
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function CreateEvent() {
    // const [selectedDates, setSelectedDates] = useState([{ start: new Date(), end: new Date() }]);
    const [invitee, setInvitee] = useState([]);
    const [eventName, setEventName] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDetails, setEventDetails] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const [usernames, setUsernames] = useState(['John', 'Mary', 'Bill', 'Sue']);
    const [selectors, setSelectors] = useState([<TimeSelector av = {availableTimes} set = {setAvailableTimes}/>]);
    //console.log(invitee);
    // const handleAddDateTime = () => {
    //     setSelectedDates([...selectedDates, { start: new Date(), end: new Date() }]);
    // };

    useEffect(() => {
        const fetchUsernames = async () => {
            try {
                const response = await axios.get('http://localhost:3000/event/getAllUsernames');
                setUsernames(response.data);
            } catch (error) {
                console.error("Error fetching usernames:", error);
            }
        };
    
        fetchUsernames();
    }, []);

    const handleAddDateTime = () => {
        //setSelectedDates([...selectedDates, { start: new Date(), end: new Date() }]);
        //need to render a second TimeSel,ector 
        const copy = [...selectors];
        copy.push(<TimeSelector av = {availableTimes} set = {setAvailableTimes}/>);
        console.log(copy);
        setSelectors(copy);
    };

    const CreateEvent = async() => {
        //for when backend is set up
      
        try{
          const result = await axios.post('http://localhost:3000/event/create-new-event', {
            event_name: eventName,
            locations: eventLocation,
            details: eventDetails,
            times: availableTimes,
            usernames: invitee,
          });
          if(result){
            navigate('/');
          }
        }
        catch(err){
          console.log(err);
        }

        // console.log({
        //       event_name: eventName,
        //       location: eventLocation,
        //       details: eventDetails,
        //       times: availableTimes,
        //       users: invitee,
        //     })
      }
 
    const handleClick = (event) => {
      CreateEvent();
    }

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);
    //     signup(data.get('username'), data.get('password'), data.get('firstName'), data.get('lastName'));
    //     console.log({
    //       username: data.get('username'),
    //       password: data.get('password'),
    //     });
    //   };

    const nameOptions = [];
    for (let user of usernames){
      nameOptions.push(<MenuItem value = {user}>{user}</MenuItem>);
    }
      
    return (
        <Container maxWidth="md" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h4" gutterBottom>
                Create Event
            </Typography>
            <TextField fullWidth label="Event Name" margin="normal" onChange={(e) => {setEventName(e.target.value)}}/>
            <TextField fullWidth label="Event Location" margin="normal" onChange={(e) => {setEventLocation(e.target.value)}}/>
            <TextField fullWidth label="Event Summary" margin="normal" multiline rows={4} onChange={(e) => {setEventDetails(e.target.value)}}/>

            {selectors}
            <Button onClick={handleAddDateTime}>
                           Add another availability window
            </Button>

            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                {selectedDates.map((date, idx) => (
                    <Box key={idx} display="flex" alignItems="center" marginY={2}>
                        <DesktopDateTimePicker
                            label="Start Time"
                            inputFormat="MM/dd/yyyy HH:mm a"
                            value={date.start}
                            onChange={(newDate) => {
                                const newDates = [...selectedDates];
                                newDates[idx].start = newDate;
                                setSelectedDates(newDates);
                            }}
                            renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
                        />
                        <DesktopDateTimePicker
                            label="End Time"
                            inputFormat="MM/dd/yyyy HH:mm a"
                            value={date.end}
                            onChange={(newDate) => {
                                const newDates = [...selectedDates];
                                newDates[idx].end = newDate;
                                setSelectedDates(newDates);
                            }}
                            renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
                        />
                        <IconButton onClick={handleAddDateTime}>
                            <AddIcon />
                        </IconButton>
                    </Box>
                ))}
            </LocalizationProvider> */}

            <FormControl fullWidth margin="normal">
                <InputLabel>Invite</InputLabel>
                <Select
                    value='users'
                    onChange={(e) => {
                        const copy = [...invitee];
                        copy.push(e.target.value);
                        setInvitee(copy);
                    }}
                >
                    {nameOptions}

                </Select>
            </FormControl>

            <Box display="flex" justifyContent="flex-end" marginTop={3}>
                <Button variant="contained" color="primary" onClick = {handleClick}>
                    Create Event
                </Button>
            </Box>
        </Container>
    );
}



// import React, { useState } from 'react';
// import TimeSelector from '../Components/TimeSelector.jsx';
// import { 
//     Box, 
//     Button, 
//     Container, 
//     Typography, 
//     InputLabel, 
//     FormControl, 
//     Select, 
//     MenuItem, 
//     IconButton,
//     TextField
// } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import {DateTimePicker, DesktopDateTimePicker} from '@mui/x-date-pickers';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import de from 'date-fns/locale/de';


// const defaultTheme = createTheme();

// export default function CreateEvent() {

//     const navigate = useNavigate();

//     const [selectedDates, setSelectedDates] = useState([{ start: new Date(), end: new Date() }]);

//     const [invitee, setInvitee] = useState("");

//     const [usernames, setUsernames] = useState([]);

//     //Fetching the Usernames for dropdown menu
//       // The empty dependency array ensures this effect runs only once when the component mounts.
    



 

//     return (
//         <Container maxWidth="sm" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)' }}>
//             <Typography variant="h4" gutterBottom>
//                 Create Event
//             </Typography>
            
//             <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

//             <TextField fullWidth label="Event Name" margin="normal" />
//             <TextField fullWidth label="Event Location" margin="normal" />
//             <TextField fullWidth label="Event Summary" margin="normal" multiline rows={4} />
   
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//                 {selectedDates.map((date, idx) => (
//                     <Box key={idx} display="flex" alignItems="center" marginY={2}>
//                         <DesktopDateTimePicker
//                             label="Start Time"
//                             inputFormat="MM/dd/yyyy HH:mm a"
//                             value={date.start}
//                             onChange={(newDate) => {
//                                 const newDates = [...selectedDates];
//                                 newDates[idx].start = newDate;
//                                 setSelectedDates(newDates);
//                             }}
//                             renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
//                         />
//                         <DesktopDateTimePicker
//                             label="End Time"
//                             inputFormat="MM/dd/yyyy HH:mm a"
//                             value={date.end}
//                             onChange={(newDate) => {
//                                 const newDates = [...selectedDates];
//                                 newDates[idx].end = newDate;
//                                 setSelectedDates(newDates);
//                             }}
//                             renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
//                         />
                        
//                     </Box>
//                 ))}
//             </LocalizationProvider>

//             <FormControl fullWidth margin="normal">
//     <InputLabel>Invite</InputLabel>
//     <Select
//         value={invitee}
//         onChange={(e) => setInvitee(e.target.value)}
//     >
//         {usernames.map((username) => (
//             <MenuItem key={username} value={username}>
//                 {username}
//             </MenuItem>
//         ))}
//     </Select>
// </FormControl>

//             <Box display="flex" justifyContent="flex-end" marginTop={3}>
//                 <Button variant="contained" color="primary" type="submit">
//                     Create Event
//                 </Button>
//             </Box>

//             </Box>



//         </Container>
//     );
// }
