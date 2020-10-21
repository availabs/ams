import React from "react"

export default Component =>
  class Wrapper extends React.Component {
    static defaultProps = {
      amsAction: "directory",
      showInDirectory: false
    }
    render() {
      return (
        <Component { ...this.props }/>
      )
    }
  }
