import React from "react"

const amsProfileWrapper = Component =>
  ({ children, getMessages, ...props }) => {

    React.useEffect(() => {
      getMessages();
    }, [getMessages]);

    return (
      <Component { ...props }>
        { React.Children.toArray(children)
            .map(child => React.cloneElement(child, props))
        }
      </Component>
    );
  }
export default amsProfileWrapper;
