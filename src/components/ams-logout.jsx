import React from "react"

import { Navigate } from "react-router"

import logoutWrapper from "../wrappers/ams-logout"

export default logoutWrapper(({ logout, redirectTo='/' }) => {
  React.useEffect(() => {
    logout();
  }, [logout]);
  return <Navigate to={ redirectTo }/>
})
