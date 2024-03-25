import React from "react"

import { Navigate } from "react-router-dom";

export default Component =>
  class LogoutWrapper extends React.Component {
    static defaultProps = {
      amsAction: "logout",
      redirectTo: "/",
      authLevel: 0
    }
    render() {
      return <Component { ...this.props }/>;
    }
  }
