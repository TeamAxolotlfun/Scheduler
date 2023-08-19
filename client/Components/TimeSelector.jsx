import React from 'react';
import {DateTimePicker, DesktopDateTimePicker} from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Container from '@mui/material/Container'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import de from 'date-fns/locale/de';

const TimeSelector = (props) => {
  const {start, end} = props.timeConstraints;
  console.log(start);
  console.log(end);
   return (
    <Container>
      <LocalizationProvider dateAdapter={AdapterDateFns} >
        <DesktopDateTimePicker label = 'enter a start time' minDateTime = {start} maxDateTime = {end}/>
        <DateTimePicker label = 'enter an end time' minDateTime = {start} maxDateTime = {end}/>
      </LocalizationProvider>
    </Container>
   );
}

export default TimeSelector;