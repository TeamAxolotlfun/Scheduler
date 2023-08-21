import React, {useState} from 'react';
import {createBrowserRouter, RouterProvider, } from "react-router-dom";
import LogIn from './Containers/Login.jsx';
import SignUp from './Containers/Signup.jsx';
import TimeSelectorPage from './Containers/TimeSelectorPage.jsx';
import CreateEvent from './Containers/CreateEvent.jsx';
import HomePage from './Containers/HomePage.jsx';



const App = () => {
  const [ev, setEvent] = useState({});
  const router = createBrowserRouter([
    {
      path: '/home',
      element: <HomePage set = {setEvent}/>,
    },
   {
     path: '/user/login', 
     element: <LogIn/>,
   },
   {
     path: '/user/signup',
     element: <SignUp/>,
   },
   {
     path: '/createevent',
     element: <CreateEvent/>,
   },
   {
     path: '/selecttimes',
     element: <TimeSelectorPage event = {ev}/>
   }
 
 ]);
  return (
    <div>
      <RouterProvider router = {router}/>
    </div>
  )
 };

export default App;
