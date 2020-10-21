import React from "react"

export default Component =>
  class Wrapper extends React.Component {
    static defaultProps = {
      amsAction: "profile",
      authLevel: 0
    }
    render() {
      return <Component { ...this.props }/>;
    }
  }
