import React, { useState } from 'react';
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

export default function CreateEvent() {
    // const [selectedDates, setSelectedDates] = useState([{ start: new Date(), end: new Date() }]);
    const [invitee, setInvitee] = useState("");

    // const handleAddDateTime = () => {
    //     setSelectedDates([...selectedDates, { start: new Date(), end: new Date() }]);
    // };

    return (
        <Container maxWidth="sm" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)' }}>
            <Typography variant="h4" gutterBottom>
                Create Event
            </Typography>
            <TextField fullWidth label="Event Name" margin="normal" />
            <TextField fullWidth label="Event Location" margin="normal" />
            <TextField fullWidth label="Event Summary" margin="normal" multiline rows={4} />

            {<TimeSelector/>}

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
                    value={invitee}
                    onChange={(e) => setInvitee(e.target.value)}
                >
                    {/* Modify with actual invitee list */}
                    <MenuItem value="John">John</MenuItem>
                    <MenuItem value="Jane">Jane</MenuItem>
                    <MenuItem value="Doe">Doe</MenuItem>
                </Select>
            </FormControl>

            <Box display="flex" justifyContent="flex-end" marginTop={3}>
                <Button variant="contained" color="primary">
                    Create Event
                </Button>
            </Box>
        </Container>
    );
}
