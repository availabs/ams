import React from "react"
import isEqual from "lodash/isEqual"

const DefaultState = {
  current: "",
  password: "",
  verify: ""
}

const amsProfileWrapper = Component =>
  ({ getMessages, preferences, getUserPreferences, updateUserPreferences, updatePassword, ...props }) => {
    const [passwordState, setPasswordState] = React.useState(DefaultState);

    React.useEffect(() => {
      getMessages();
    }, [getMessages]);

    React.useEffect(() => {
      getUserPreferences();
    }, [getUserPreferences]);

    const updatePasswordState = React.useCallback(update => {
      setPasswordState(prev => ({ ...prev, ...update }));
    }, []);

    const canSubmitPassword = React.useMemo(() => {
      const { current, password, verify } = passwordState;
      return current && password && (current !== password) && (password === verify);
    }, [passwordState]);

    const handleSubmitPassword = React.useCallback(e => {
      e.preventDefault();
      canSubmitPassword && updatePassword(passwordState.current, passwordState.password);
    }, [updatePassword, passwordState, canSubmitPassword]);



    const [newPreferences, setNewPreferences] = React.useState(preferences)

    React.useEffect(() => {
      setNewPreferences(preferences);
    }, [preferences]);

    const updatePreferencesDisabled = React.useMemo(() => {
      return isEqual(preferences, newPreferences);;
    }, [preferences, newPreferences]);

    const updatePreferences = React.useCallback(e => {
      updateUserPreferences(newPreferences)
    }, [updateUserPreferences, newPreferences]);


    return (
      <Component { ...props } { ...passwordState }
        canSubmit={ canSubmitPassword }
        handleSubmit={ handleSubmitPassword }
        update={ updatePasswordState }
        preferences={ newPreferences }
        setNewPreferences={ setNewPreferences }
        updateDisabled={ updatePreferencesDisabled }
        updatePreferences={ updatePreferences } 
        
        />
    );
  }
export default amsProfileWrapper;
