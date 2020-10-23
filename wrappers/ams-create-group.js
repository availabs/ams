import React from "react"

export default Component =>
  class Wrapper extends React.Component {
    static defaultProps = {
      amsAction: "create-group",
      authLevel: 5
    }
    state = {
      group: "",
      authLevel: -1
    }
    handleSubmit(e) {
      e.preventDefault();
      const { group, authLevel } = this.state;
      this.props.createAndAssign(group, authLevel);
      this.setState({ group: "", authLevel: -1 });
    }
    render() {
      const { user } = this.props, { group, authLevel } = this.state,
        canSubmit = group && (authLevel >= 0) && (user.authLevel >= authLevel);
      return (
        <Component { ...this.props } { ...this.state }
          groups={ this.props.otherGroups }
          update={ u => this.setState(u) }
          canSubmit={ canSubmit }
          handleSubmit={ e => this.handleSubmit(e) }/>
      )
    }
  }
