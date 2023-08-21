import React, {useState} from 'react';
import {DateTimePicker, DesktopDateTimePicker} from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import de from 'date-fns/locale/de';

const TimeSelector = (props) => {
  const [startTime, setStart] = useState();
  const [endTime, setEnd] = useState();
  const {av, set} = props;
  let start, end;
  if (props && props.timeConstraints){ 
    start = props.timeConstraints.start;
    end = props.timeConstraints.end;
  }

  const handleClick = (event) => {
    const copy = [...av];
    copy.push({start: startTime, end: endTime});
    set(copy);
  }


   return (
    <Container maxWidth="md">
      <LocalizationProvider dateAdapter={AdapterDateFns} >
        <DesktopDateTimePicker 
        label = 'enter a start time' minDateTime = {start} maxDateTime = {end} onChange = {(newDate) => setStart(newDate)}
        />
        <DateTimePicker 
          label = 'enter an end time' minDateTime = {start} maxDateTime = {end} onChange = {(newDate) => setEnd(newDate)} 
        />
      </LocalizationProvider>
      <Button marginTop={3} onClick = {handleClick}>Confirm</Button>
    </Container>
   );
}

export default TimeSelector;