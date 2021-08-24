import React from "react"

import { connect } from "react-redux"

import * as API from "../api"

export const AmsApiContext = React.createContext({ ...API });
export const useAmsApi = () => React.useContext(AmsApiContext);

export default Component => {
  const mapStateToProps = state => ({
    user: state.user,
    slacker: state.slacker,
    groups: state.groups,
    users: state.users,
    requests: state.requests,
    messages: state.avlMessages,
    preferences: state.preferences
  });
  return connect(mapStateToProps, { ...API })(Component);
}
