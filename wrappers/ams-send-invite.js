import React from "react"

export default Component =>
  class Wrapper extends React.Component {
    static defaultProps = {
      amsAction: "send-invite",
      authLevel: 5
    }
    state = {
      email: "",
      verify: "",
      group: null
    }
    handleSubmit(e) {
      e.preventDefault();
      this.props.sendInvite(this.state.email, this.state.group.name);
    }
    render() {
      const { email, verify, group } = this.state,
        canSubmit = email && verify && group && (email === verify);

      return (
        <Component { ...this.props } { ...this.state }
          handleSubmit={ e => this.handleSubmit(e) }
          update={ u => this.setState(u) }
          canSubmit={ canSubmit }/>
      )
    }
  }
