import React from "react"

import deepequal from "deep-equal"

const amsEmailPreferencesWrapper = Component =>
  ({ preferences, getUserPreferences, updateUserPreferences, ...props }) => {

    React.useEffect(() => {
      getUserPreferences();
    }, [getUserPreferences]);

    const [newPreferences, _setNewPreferences] = React.useState(preferences);

    React.useEffect(() => {
      _setNewPreferences(preferences);
    }, [preferences]);

    const setNewPreferences = React.useCallback(receiveEmail => {
      _setNewPreferences({
        ...preferences,
        receiveEmail
      })
    }, [_setNewPreferences, preferences]);

    const updateDisabled = React.useMemo(() => {
      return deepequal(preferences, newPreferences);;
    }, [preferences, newPreferences]);

    const updateEmailPreferences = React.useCallback(e => {
      updateUserPreferences(newPreferences)
    }, [updateUserPreferences, newPreferences]);

    return (
      <Component { ...props }
        newPreferences={ newPreferences }
        setNewPreferences={ setNewPreferences }
        updateDisabled={ updateDisabled }
        updateEmailPreferences={ updateEmailPreferences }/>
    )
  }
export default amsEmailPreferencesWrapper;
