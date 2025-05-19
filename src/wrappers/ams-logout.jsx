import React from "react"

import { Navigate } from "react-router";

export default Component =>
  class LogoutWrapper extends React.Component {
    static defaultProps = {
      amsAction: "logout",
      redirectTo: "/",
      authLevel: 0
    }
    render() {
      const { user, redirectTo } = this.props;
      if (!user.authed) {
        return <Navigate to={ redirectTo }/>
      }
      return <Component { ...this.props }/>;
    }
  }
