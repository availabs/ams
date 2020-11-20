import React from "react"

import { connect } from "react-redux"

import * as API from "../api"

export const AmsApiContext = React.createContext({ ...API });
export const useAmsApi = () => React.useContext(AmsApiContext);

export const AmsConfigContext = React.createContext({});

export default Component => {
  const mapStateToProps = state => ({
      user: state.user,
      groups: state.groups,
      users: state.users,
      requests: state.requests
    });
  return connect(mapStateToProps, { ...API })(Component);
}
