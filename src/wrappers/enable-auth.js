import React from "react"

import { connect } from "react-redux"

import { auth } from '../api/auth';
import { Config } from "../api/utils"
import { AuthContent } from "../reducers"

import get from "lodash.get"

import { defaultUserState } from "../reducers/user"

const AuthContext = React.createContext(defaultUserState());
export const useAuth = () => React.useContext(AuthContext);

export const enableAuth = (Component, config) => {
  Config(config);
  const EnableAuth = ({ auth, ...props }) => {
    React.useEffect(() => { auth(); }, [auth]);
    return (
      <AuthContext.Provider value={ props.user }>
        <Component { ...props }
          isAuthenticating={
            get(props, ["user", "isAuthenticating"], false)
          }/>
      </AuthContext.Provider>
    )
  }
  const mapStateToProps = state => ({ user: state.user });
  return connect(mapStateToProps, { auth })(EnableAuth);
}
