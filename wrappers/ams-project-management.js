import React from "react"

export default Component =>
  class ManagementWrapper extends React.Component {
    static defaultProps = {
      amsAction: "project-management",
      authLevel: 5
    }
    componentDidMount() {
      this.props.getGroups();
      this.props.getUsers();
      this.props.getRequests();
    }
    render() {
      return (
        <Component { ...this.props }/>
      )
    }
  }
