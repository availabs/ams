import React from "react"

import { Navigate } from "react-router-dom"

import logoutWrapper from "../wrappers/ams-logout"

export default logoutWrapper(({ logout, redirectTo='/' }) => {
  React.useEffect(() => { 
    //console.log('logout', redirectTo)
    logout();
    //redirect(redirectTo); 
    console.log('then')
  }, [logout]);
  return  <Navigate to={redirectTo} />  
})
