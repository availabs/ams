import { sendSystemMessage } from "@availabs/avl-components";

import { postJson, Config } from "./utils"

export const GET_PREFERENCES = "AMS::GET_PREFERENCES";

export const getUserPreferences = () =>
  (dispatch, getState) => {
    const { token } = getState().user;
    if (token) {
      const { AUTH_HOST, PROJECT_NAME } = Config();
      postJson(`${ AUTH_HOST }/preferences`, { token, project: PROJECT_NAME })
        .then(res => {
          if (res.error) {
            dispatch(sendSystemMessage(res.error));
          }
          else {
            dispatch({
              type: GET_PREFERENCES,
              preferences: res.preferences || {}
            })
          }
        })
    }
    else {
      return Promise.resolve();
    }
  }
export const updateUserPreferences = preferences =>
  (dispatch, getState) => {
    const { token } = getState().user;
    if (token) {
      const { AUTH_HOST, PROJECT_NAME } = Config();
      postJson(`${ AUTH_HOST }/preferences/update`, { token, project: PROJECT_NAME, preferences })
        .then(res => {
          if (res.error) {
            dispatch(sendSystemMessage(res.error));
          }
          else {
            dispatch(sendSystemMessage(res.message));
            dispatch({
              type: GET_PREFERENCES,
              preferences: res.preferences
            });
          }
        })
    }
    else {
      return Promise.resolve();
    }
  }
