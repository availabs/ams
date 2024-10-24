import React from "react"
import isEqual from "lodash/isEqual"
const userPreferencesWrapper = Component =>
  ({ preferences, getUserPreferences, updateUserPreferences, ...props }) => {

    React.useEffect(() => {
      getUserPreferences();
    }, [getUserPreferences]);

    const [newPreferences, setNewPreferences] = React.useState(preferences)

    React.useEffect(() => {
      setNewPreferences(preferences);
    }, [preferences]);

    const updateDisabled = React.useMemo(() => {
      return isEqual(preferences, newPreferences);;
    }, [preferences, newPreferences]);

    const updatePreferences = React.useCallback(e => {
      updateUserPreferences(newPreferences)
    }, [updateUserPreferences, newPreferences]);

    return (
      <Component 
        { ...props } 
        preferences={newPreferences}
        setNewPreferences={ setNewPreferences }
        updateDisabled={ updateDisabled }
        updatePreferences={updatePreferences} 
      />
    )
  }
export default userPreferencesWrapper;
