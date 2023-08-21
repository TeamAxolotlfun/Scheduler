// const getEventTimes = async () => {
  //      try{
  //       const response = axios.get(`http://localhost:3000/event/gettingInvitationTimes/?event=${event_id}`);
  //       const times = response.data.times;
  //       console.log('you got back', times); 
  //       for (let time of times){
  //         timeSelectors.push(<TimeSelector av = {availableTimes} set = {setAvailableTimes} timeConstraints = {time}/>)
  //       }
  //      }
  //      catch (err){
  //       console.log(err);
  //      }
  //   }
  //   useEffect(() => {
  //     getEventTimes()}, []);
  //   const times = [{start: new Date('August 20, 2023 06:30:00'), end: new Date('August 22, 2023 18:30:00')}, {start: new Date('August 23, 2023 06:30:00'), end: new Date('August 25, 2023 18:30:00')}]; //dummy code for testing front end