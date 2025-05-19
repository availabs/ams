import React from "react"

import { connect } from "react-redux"

import { auth } from '../api/auth';
import { Config } from "../api/utils"

import get from "lodash/get"

import { defaultUserState } from "../reducers/user"
import Reducers from '../reducers'
import messages from '../messages'

import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    ...Reducers,
    messages,
  },
});

const AuthContext = React.createContext(defaultUserState());
export const useAuth = () => React.useContext(AuthContext);

export const enableAuth = (Component, config) => {
  Config(config);
  const EnableAuth = ({ authFunc, ...props }) => {
    React.useEffect(() => { authFunc(); }, [authFunc]);
    return (
        <AuthContext.Provider value={ props.user }>
          <Component { ...props }
            isAuthenticating={ get(props, ["user", "isAuthenticating"], false) }/>
        </AuthContext.Provider>
    )
  }
  const mapStateToProps = state => ({ user: state.user });
  return connect(mapStateToProps, { authFunc: auth })(EnableAuth);
}


export const authProvider = (Component, config) => {
  const AuthComponent = enableAuth(Component, config)
  const AuthProvider = ({ ...props }) => {
    return (
      <Provider store={store}>
        <AuthComponent {...props}/>
      </Provider>
    )
  }
  return AuthProvider;
}



export const withAuth = Component => {
  const mapStateToProps = (state, props) => ({ user: state.user });
  return connect(mapStateToProps, null)(Component);
}



