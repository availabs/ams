import React from "react"

import matchSorter from 'match-sorter'

export default Component =>
  class Wrapper extends React.Component {
    static defaultProps = {
      amsAction: "user-search",
      authLevel: 5
    }
    state = {
      search: "",
      amount: 5
    }
    adjustAmount(adj, total) {
      const { amount } = this.state;
      if (((adj < 0) && (amount > 5)) || ((adj > 0) && (amount < total))) {
        this.setState({ amount: amount + adj });
      }
    }
    render() {
      const matches = matchSorter(this.props.users, this.state.search, { keys: ["email"] }),
        remaining = Math.max(0, matches.length - this.state.amount);
      return (
        <Component { ...this.props } { ...this.state }
          setSearch={ search => this.setState({ search }) }
          adjustAmount={ adj => this.adjustAmount(adj, matches.length) }
          matches={ this.state.search ? matches.slice(0, this.state.amount) : [] }
          remaining={ remaining }/>
      )
    }
  }
