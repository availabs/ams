import React from "react"

import { redirect } from "react-router"

export default Component =>
  class Wrapper extends React.Component {
    static defaultProps = {
      amsAction: "accept-invite",
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
      this.props.acceptInvite(this.props.urlArg, this.state.password);
      this.setState({ password: "", verify: "" });
    }
    render() {
      const { password, verify } = this.state,
        canSubmit = password && verify && (password === verify);

      if (this.props.user.authed) {
        return redirect(this.props.redirectTo)//<Redirect to={ this.props.redirectTo }/>
      }
      return (
        <Component { ...this.state } { ...this.props }
          canSubmit={ canSubmit }
          handleSubmit={ e => this.handleSubmit(e) }
          update={ u => this.setState(u) }/>
      )
    }
  }
