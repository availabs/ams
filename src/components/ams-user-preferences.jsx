import React from "react"

const AmsUserPreferences = ({ children, ...props }) => {

  return (
    <React.Fragment>
      { React.Children.toArray(children)
          .map(child => React.cloneElement(child, props))
      }
    </React.Fragment>
  )
}
export default ({
  type: AmsUserPreferences,
  props: { amsAction: "user-preferences", authLevel: 0 },
  wrappers: ["ams-user-preferences"]
})
