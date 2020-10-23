import React from "react"

export default Component =>
  class Wrapper extends React.Component {
    static defaultProps = {
      amsAction: "update-password"
    }
    state = {
      current: "",
      password: "",
      verify: ""
    }
    handleSubmit(e) {
      e.preventDefault();
      this.props.updatePassword(this.state.current, this.state.password);
    }
    render() {
      const { current, password, verify } = this.state,
        canSubmit = current && password && verify && (password === verify);
      return (
        <Component { ...this.props } { ...this.state }
          handleSubmit={ e => this.handleSubmit(e) }
          update={ u => this.setState(u) }
          canSubmit={ canSubmit }/>
      );
    }
  }
