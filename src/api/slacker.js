import { sendSystemMessage } from "@availabs/avl-components";

import { Config } from "./utils"

export const GET_SLACK_USER = "AMS::GET_SLACK_USER";

export const getSlackUserFromEmail = email =>
  (dispatch, getState) => {
    const { SLACK_KEY } = Config();
    if (SLACK_KEY) {
      const URL = `https://slack.com/api/users.lookupByEmail`;
      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/x-www-form-urlencoded"
        },
        body: `token=${ encodeURIComponent(SLACK_KEY) }&email=${ encodeURIComponent(email) }`
      }
      return fetch(URL, options)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          dispatch(sendSystemMessage("There was a network error."));
        })
        .then(res => {
          if (res.ok) {
            dispatch({
              type: GET_SLACK_USER,
              slacker: res.user
            });
          }
          else {
            dispatch(sendSystemMessage(res.error));
          }
        })
    }
    else {
      return Promise.resolve();
    }
  }

export const getSlackUserFromUserId = userId =>
  (dispatch, getState) => {
    const { SLACK_KEY } = Config();
    if (SLACK_KEY) {
      // const URL = `https://slack.com/api/users.lookupByEmail`;
      // const options = {
      //   method: "POST",
      //   headers: {
      //     "Content-type": "application/x-www-form-urlencoded"
      //   },
      //   body: `token=${ encodeURIComponent(SLACK_KEY) }&email=${ encodeURIComponent(email) }`
      // }
      // return fetch(URL, options)
      //   .then(res => {
      //     if (res.ok) {
      //       return res.json();
      //     }
      //     dispatch(sendSystemMessage("There was a network error."));
      //   })
      //   .then(res => {
      //     if (res.ok) {
      //       dispatch({
      //         type: GET_SLACK_USER,
      //         slacker: res.user
      //       });
      //     }
      //     else {
      //       dispatch(sendSystemMessage(res.error));
      //     }
      //   })
    }
    else {
      return Promise.resolve();
    }
  }
