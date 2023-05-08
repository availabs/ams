import React from "react"

export default Component =>
  class Wrapper extends React.Component {
    static defaultProps = {
      amsAction: "assign-to-project",
      authLevel: 5
    }
    state = {
      group: null,
      authLevel: -1
    }
    handleSubmit(e) {
      e.preventDefault();
      const { group, authLevel } = this.state;
      this.props.assignToProject(group.name, authLevel);
      this.setState({ group: null, authLevel: -1 });
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
