import React from "react"

const userPreferencesWrapper = Component =>
  ({ getUserPreferences, ...props }) => {

    React.useEffect(() => {
      getUserPreferences();
    }, [getUserPreferences]);

    return (
      <Component { ...props }/>
    )
  }
export default userPreferencesWrapper;
