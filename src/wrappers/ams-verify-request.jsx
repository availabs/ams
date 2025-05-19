import React from "react"

import { Navigate } from "react-router"

export default Component =>
  class Wrapper extends React.Component {
    static defaultProps = {
      amsAction: "verify-request",
      urlArg: null,
      showInDirectory: false,
      redirectTo: "/"
    }
    state = {
      password: "",
      verify: ""
    }
    handleSubmit(e) {
      e.preventDefault();
      this.setState({ password: "", verify: "" });
      this.props.verifyRequest(this.props.urlArg, this.state.password);
    }
    render() {
      const { password, verify } = this.state,
        canSubmit = password && verify && (password === verify);

      if (this.props.user.authed) {
        return <Navigate to={ this.props.redirectTo }/>
      }
      return (
        <Component { ...this.state } { ...this.props }
          canSubmit={ canSubmit }
          handleSubmit={ e => this.handleSubmit(e) }
          update={ u => this.setState(u) }/>
      )
    }
  }
