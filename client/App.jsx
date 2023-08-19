import React from 'react';
import {createBrowserRouter, RouterProvider, } from "react-router-dom";
import LogIn from './Containers/Login.jsx';
import SignUp from './Containers/Signup.jsx'

const router = createBrowserRouter([
   {
     path: '/home',
     element: <p>Welcome</p>,
   },
  {
    path: '/user/login', 
    element: <LogIn/>,
  },
  {
    path: '/user/signup',
    element: <SignUp/>,
  },
//   {
//     path: '/createevent',
//     element: <CreateEvent/>,
//   },
//   {
//     path: '/selecttimes',
//     element: <TimeSelector/>
//   }

]);

const App = () => (
  <div>
    <RouterProvider router = {router}/>
  </div>
);

export default App;
