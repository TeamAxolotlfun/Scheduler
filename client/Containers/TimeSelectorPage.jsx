import React from 'react';
import TimeSelector from '../Components/TimeSelector.jsx';
import axios from 'axios';

const TimeSelectorPage = (event_id) => {
    const getEventTimes = async () => {
       try{
        const response = axios.get(`http://localhost:3000/event_times/?event=${event_id}`);
        const times = response.data; 
        return times;
       }
       catch (err){
        console.log(err);
       }
    }
    const timeSelectors = [];
    const times = [{start: new Date('August 20, 2023 06:30:00'), end: new Date('August 22, 2023 18:30:00')}, {start: new Date('August 23, 2023 06:30:00'), end: new Date('August 25, 2023 18:30:00')}]; //dummy code for testing front end
    for(let time of times){
      timeSelectors.push(<TimeSelector timeConstraints = {time}/>)
    }
    return (
      <div>
        {timeSelectors}
      </div>
    )
}

export default TimeSelectorPage;
