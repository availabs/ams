import React from "react"

// import { RouterContext } from "../contexts"

import {
  useParams,
  useNavigate, useLocation,
  Routes, Route
} from "react-router-dom"

const GetParams = ({ Component, ...props }) => {
  console.log('getting params', Component, props)
  return <Component { ...props } params={ { ...useParams() } }/>;
}

export default Component =>
  ({ ...props }) => {

    const { path } = useLocation(),
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


    console.log('props', props)

    // return (
    //     <Routes>
    //       <Route exact path={ path } element={<Component { ...props } { ...routerProps } path={ path }/>} />
    //       <Route exact path={ [alt1, alt2] } element={<GetParams { ...props } { ...routerProps } path={ path } Component={ Component }/>} />
    //     </Routes>
    // )
    return (
      <Routes>
        <Route path={ '/auth/' } element={<Component { ...props } { ...routerProps } path={ path }/>} >
          <Route path={ 'login' } element={<GetParams { ...props } { ...routerProps } path={ path } Component={ Component }/>} />
        </Route>
        {/*<Route exact path={ alt2 } element={<GetParams { ...props } { ...routerProps } path={ path } Component={ Component }/>} />*/}
      </Routes>
    )
  }
