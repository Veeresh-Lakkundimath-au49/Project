import React from 'react';
import { Navigate } from 'react-router-dom';

export default function Nav() {
  //const loggedIn = false; // Replace with auth check logic

  //return <>{loggedIn ? <h1>Private page</h1> : <Navigate to="/login" />}</>;

  return <>{<Navigate to="/login" />}</>;

}