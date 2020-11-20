import React from "react"

import { connect } from "react-redux"

import { auth } from '../api/auth';
import { Config } from "../api/utils"

import get from "lodash.get"

export default (Component, config) => {
  Config(config);
  const EnableAuth = ({ auth, ...props }) => {
    React.useEffect(() => { auth(); }, [auth]);
    return (
      <Component { ...props }
        isAuthenticating={
          get(props, ["user", "isAuthenticating"], false)
        }/>
    )
  }
  const mapStateToProps = state => ({ user: state.user });
  return connect(mapStateToProps, { auth })(EnableAuth);
}
