import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Chat from './Chat';
import { selectUser } from './features/userSlice';
import { auth } from './firebase';
import Login from './Login';
import Sidebar from './Sidebar';
import {login, logout} from './features/userSlice'

function App() {
// pulling user
  const user = useSelector(selectUser);
  // using dispatch --> which act as gun to shoot user to data layer
  const dispatch = useDispatch();

useEffect(()=>{
  // act as a listener --> any time authentication state changes it just listen to it
  auth.onAuthStateChanged((authUser) => {
    console.log('User is >>>',authUser);
    if(authUser) {
      // the user is logged in --> dispatch login action --> & payload for login action --> set some of the user details
      dispatch(login({
        uid: authUser.uid,
        photo: authUser.photoURL,
        email: authUser.email,
        displayName: authUser.displayName,
      })
      );
    } else {
      // the user is logged out
      dispatch(logout());
    }
  })
},[dispatch]);

  return (
    <div className="app">
      {user? (
        <>
          <Sidebar />
          <Chat />
        </>
      ): (
        <Login />
      )}
      
    </div>
  );
}

export default App;
