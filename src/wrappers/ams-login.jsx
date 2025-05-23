import React from "react"

import { Navigate } from "react-router"

import get from "lodash/get"

export default Component =>
  class LoginWrapper extends React.Component {
    static defaultProps = {
      amsAction: "login",
      redirectTo: "/",
      showIfLoggedIn: false
    }
    state = {
      email: "",
      password: ""
    }
    handleSubmit(e) {
      e.preventDefault();
      this.props.login(this.state.email, this.state.password);
    }
    render() {
      const { email, password } = this.state,
        canSubmit = email && password,

        { location, user } = this.props,
        { pathname } = location;

        let {redirectTo} = this.props;
        redirectTo = location?.state?.redirectTo ?? redirectTo;

      if (user.authed) {
        const from = get(location, ["state", "from"]),
          to = ((pathname === from) || !from) ? redirectTo : from;
        return <Navigate to={ to } state={null} />
      }
      return (
        <Component { ...this.props } { ...this.state }
          handleSubmit={ e => this.handleSubmit(e) }
          update={ u => this.setState(u) }
          canSubmit={ canSubmit }/>
      );
    }
  }
