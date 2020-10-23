import React from "react"

export default Component =>
  class Wrapper extends React.Component {
    static defaultProps = {
      amsAction: "requests",
      authLevel: 5
    }
    render() {
      const { requests, ...props } = this.props,
        [pending, awaiting, rejected] = requests.reduce((a, c) => {
          if (c.state === 'pending') {
            a[0].push(c);
          }
          else if (c.state === 'awaiting') {
            a[1].push(c);
          }
          else if (c.state === 'rejected') {
            a[2].push(c);
          }
          return a;
        }, [[], [], []]);

      return !requests.length ? null : (
        <Component { ...props }
          pending={ pending }
          awaiting={ awaiting }
          rejected={ rejected }/>
      )
    }
  }
