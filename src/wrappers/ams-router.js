import React from "react"

// import { RouterContext } from "../contexts"

import {
  useParams,
  useNavigate, useLocation,
  Routes, Route
} from "react-router-dom"

const RouterContext = React.createContext({});

const GetParams = ({ Component, ...props }) => {
  return <Component { ...props } params={ { ...useParams() } }/>;
}

export default Component =>
  ({ ...props }) => {
    const path = '/auth',
      // { pathname: path } = useLocation(),
      alt1 = `${ path }/:action`,
      alt2 = `${ path }/:action/:urlArg`,
      location = useLocation(),
      navigate = useNavigate(),
      routerProps = React.useMemo(() => ({
        basePath: path,
        useRouter: true,
        location,
        navigate
      }), [path, location, navigate]);

    console.log('paths', path, alt1, alt2, useParams())
    return (
      <RouterContext.Provider value={ routerProps }>
        <Routes>
          <Route exact path={ path } element={<Component { ...props } { ...routerProps } path={ path }/>} />
          <Route exact path={ alt1 } element={<GetParams { ...props } { ...routerProps } path={ alt1 } Component={ Component }/>} />
          <Route exact path={ alt2 } element={<GetParams { ...props } { ...routerProps } path={ alt2 } Component={ Component }/>} />
        </Routes>
      </RouterContext.Provider>
    )
  }
