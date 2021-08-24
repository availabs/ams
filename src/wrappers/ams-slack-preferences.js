import React from "react"

import deepequal from "deep-equal"

const amsSlackPreferencesWrapper = Component =>
  ({ slacker, preferences, getSlackUserFromEmail, getUserPreferences, updateUserPreferences, ...props }) => {

    React.useEffect(() => {
      getUserPreferences();
    }, [getUserPreferences]);

    const [newPreferences, _setNewPreferences] = React.useState(preferences),
      [slackEmail, setSlackEmail] = React.useState(null),
      [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
      _setNewPreferences(preferences);
    }, [preferences]);

    React.useEffect(() => {
      _setNewPreferences(prev => ({ ...prev, slackUserId: slacker.id }));
    }, [slacker]);

    const setNewPreferences = React.useCallback(receiveSlack => {
      _setNewPreferences({
        ...preferences,
        receiveSlack
      })
    }, [_setNewPreferences, preferences]);

    const doGetSlackUserFromEmail = React.useCallback(e => {
      e.preventDefault();
      if (slackEmail) {
        setLoading(true);
        getSlackUserFromEmail(slackEmail)
          .then(() => setLoading(false));
      }
    }, [getSlackUserFromEmail, slackEmail]);

    const updateDisabled = React.useMemo(() => {
      if (newPreferences.receiveSlack && !newPreferences.slackUserId) {
        return true;
      }
      return deepequal(preferences, newPreferences);;
    }, [preferences, newPreferences]);

    const updateSlackPreferences = React.useCallback(e => {
      updateUserPreferences(newPreferences)
    }, [updateUserPreferences, newPreferences]);

    return (
      <Component { ...props }
        loading={ loading }
        preferences={ preferences }
        newPreferences={ newPreferences }
        setNewPreferences={ setNewPreferences }
        slackEmail={ slackEmail }
        setSlackEmail={ setSlackEmail }
        getSlackUserFromEmail={ doGetSlackUserFromEmail }
        updateDisabled={ updateDisabled }
        updateSlackPreferences={ updateSlackPreferences }/>
    )
  }
export default amsSlackPreferencesWrapper;
