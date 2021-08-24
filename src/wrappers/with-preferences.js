import React from "react"

import { connect } from "react-redux"

const withPreferencesWrapper = Component => {
  const Wrapper = props => {
    return (
      <Component { ...props }/>
    )
  }
  const mapStateToProps = state => ({
    preferences: state.preferences
  })
  return connect(mapStateToProps)(Wrapper);
}
export default withPreferencesWrapper;
