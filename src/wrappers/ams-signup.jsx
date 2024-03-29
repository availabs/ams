import React from "react"

import { redirect } from "react-router-dom"

export default Component =>
  class SignupWrapper extends React.Component {
    static defaultProps = {
      amsAction: "signup",
      addToGroup: false,
      redirectTo: "/",
      showIfLoggedIn: false
    }
    state = {
      email: "",
      verify: ""
    }
    handleSubmit(e) {
      e.preventDefault();
      this.setState({ email: "", verify: "" });
      this.props.signup(this.state.email, this.props.addToGroup);
    }
    render() {
      const { email, verify } = this.state,
        canSubmit = email && verify && (email === verify);
      if (this.props.user.authed) {
        return redirect(this.props.redirectTo)//<Redirect to={ this.props.redirectTo }/>
      }
      return (
        <Component { ...this.props } { ...this.state }
          handleSubmit={ e => this.handleSubmit(e) }
          update={ u => this.setState(u) }
          canSubmit={ canSubmit }
        />
      );
    }
  }
