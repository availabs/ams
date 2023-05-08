import React from "react"

import { connect } from "react-redux"

import { auth } from '../api/auth';
import { Config } from "../api/utils"

import get from "lodash/get"

import { defaultUserState } from "../reducers/user"

const AuthContext = React.createContext(defaultUserState());
export const useAuth = () => React.useContext(AuthContext);

export const withAuth = Component => {
  const mapStateToProps = (state, props) => ({ user: state.user });
  return connect(mapStateToProps, null)(Component);
}

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
