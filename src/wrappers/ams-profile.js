import React from "react"

export default Component =>
  class Wrapper extends React.Component {
    static defaultProps = {
      amsAction: "profile",
      authLevel: 0
    }
    render() {
      const { children, ...props } = this.props;
      return (
        <Component { ...props }>
          { React.Children.toArray(children)
              .map(child => React.cloneElement(child, props))
          }
        </Component>
      );
    }
  }
