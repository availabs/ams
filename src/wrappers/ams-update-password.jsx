import React from "react"

const DefaultState = {
  current: "",
  password: "",
  verify: ""
}

const updatePasswordWrapper = Component =>
  ({ updatePassword, ...props }) => {
    const [state, setState] = React.useState(DefaultState);

    const updateState = React.useCallback(update => {
      setState(prev => ({ ...prev, ...update }));
    }, []);

    const canSubmit = React.useMemo(() => {
      const { current, password, verify } = state;
      return current && password && (current !== password) && (password === verify);
    }, [state]);

    const handleSubmit = React.useCallback(e => {
      e.preventDefault();
      canSubmit && updatePassword(state.current, state.password);
    }, [updatePassword, state, canSubmit]);

    return (
      <Component { ...props } { ...state }
        canSubmit={ canSubmit }
        handleSubmit={ handleSubmit }
        update={ updateState }/>
    );
  }
export default updatePasswordWrapper;
