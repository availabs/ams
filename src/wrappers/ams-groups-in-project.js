import React from "react"

import matchSorter from 'match-sorter'

export default Component =>
  class Wrapper extends React.Component {
    static defaultProps = {
      amsAction: "groups-in-project",
      authLevel: 5
    }
    state = {
      groupSearch: ""
    }
    render() {
      const { groups, ...props } = this.props, { groupSearch } = this.state;
      return (
        <Component { ...props } { ...this.state }
          setGroupSearch={ groupSearch => this.setState({ groupSearch }) }
          groups={ matchSorter(groups, groupSearch, { keys: ["name"] }) }/>
      )
    }
  }
