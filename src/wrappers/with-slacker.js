import React from "react"

import { connect } from "react-redux"

const withSlackerWrapper = Component => {
  const Wrapper = props => {
    return (
      <Component { ...props }/>
    )
  }
  const mapStateToProps = state => ({
    slacker: state.slacker
  })
  return connect(mapStateToProps)(Wrapper);
}
export default withSlackerWrapper;
