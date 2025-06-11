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
        this.props.navigate(redirectTo,{ replace: true, state: null })//<Navigate to={ to } state={null} />
      }
      return <Component { ...this.props }/>;
    }
  }
