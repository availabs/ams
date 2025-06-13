import React from "react"

// // import { RouterContext } from "../contexts"

import {
  useLocation, 
  useNavigate
} from "react-router"

// const RouterContext = React.createContext({});

// const GetParams = ({ Component, ...props }) => {
//   return <Component { ...props } params={ { ...useParams() } }/>;
// }

// export default Component =>
//   ({ ...props }) => {
//     const { path } = useRouteMatch(),
//       alt1 = `${ path }/:action`,
//       alt2 = `${ path }/:action/:urlArg`,
//       location = useLocation(),
//       history = useHistory(),
//       routerProps = React.useMemo(() => ({
//         basePath: path,
//         useRouter: true,
//         location,
//         history
//       }), [path, location, history]);
//     return (
//       <RouterContext.Provider value={ routerProps }>
//         <Switch>
//           <Route exact path={ path }>
//             <Component { ...props } { ...routerProps } path={ path }/>
//           </Route>
//           <Route exact path={ [alt1, alt2] }>
//             <GetParams { ...props } { ...routerProps } path={ path } Component={ Component }/>
//           </Route>
//         </Switch>
//       </RouterContext.Provider>
//     )
//   }

export default Component => (props) => {
	const location = useLocation()
	const navigate = useNavigate()
	return <Component {...props} location={location} navigate={navigate}/>
}