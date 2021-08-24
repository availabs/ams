import { sendSystemMessage } from "@availabs/avl-components";

import { postJson, Config } from "./utils"

export const GET_MESSAGES = "AMS::GET_MESSAGES";

export const getMessages = () =>
	(dispatch, getState) => {
    const { token } = getState().user;
    if (token) {
      const { AUTH_HOST, PROJECT_NAME } = Config();
      postJson(`${ AUTH_HOST }/messages`, { token, project: PROJECT_NAME })
        .then(res => {
          if (res.error) {
            dispatch(sendSystemMessage(res.error));
          }
          else {
            dispatch({
              type: GET_MESSAGES,
              ...res
            })
          }
        })
        .catch(e => {
          sendSystemMessage(e);
        })
    }
    else {
      return Promise.resolve();
    }
	}

export const viewMessages = ids =>
	(dispatch, getState) => {
    const { token } = getState().user;
    if (token) {
      const { AUTH_HOST } = Config();
      postJson(`${ AUTH_HOST }/messages/view`, { token, ids })
        .then(res => {
          if (res.error) {
            dispatch(sendSystemMessage(res.error));
          }
          else {
            dispatch(getMessages());
          }
        })
        .catch(e => {
          sendSystemMessage(e);
        })
    }
    else {
      return Promise.resolve();
    }
	}

export const deleteMessages = ids =>
	(dispatch, getState) => {
    const { token } = getState().user;
    if (token) {
      const { AUTH_HOST } = Config();
      postJson(`${ AUTH_HOST }/messages/delete`, { token, ids })
        .then(res => {
          if (res.error) {
            dispatch(sendSystemMessage(res.error));
          }
          else {
            dispatch(getMessages());
          }
        })
        .catch(e => {
          sendSystemMessage(e);
        })
    }
    else {
      return Promise.resolve();
    }
	}

  export const postMessage = (heading, message, type, target) =>
  	(dispatch, getState) => {
  		const { token } = getState().user;
  		if (token) {
console.log("POSTING MESSAGE:", heading, message, type, target);
        const { AUTH_HOST, PROJECT_NAME } = Config();
  			return postJson(`${ AUTH_HOST }/messages/post`,
            { token, heading, message, type, target, project: PROJECT_NAME }
          )
  				.then(res => {
console.log("POST RES:", res);
  					if (res.error) {
  						dispatch(sendSystemMessage(res.error));
  					}
  					else if (res.message) {
  						dispatch(sendSystemMessage(res.message, { type: "Info" }));
  					}
  				})
  		}
  		else {
  			return Promise.resolve();
  		}
  	}

// export const viewMessages = ids =>
// 	(dispatch, getState) => {
// 		if (!Array.isArray(ids)) ids = [ids];
// 		const { token } = getState().user;
// 		if (token) {
// 			postJson("/message/view", { token, ids })
// 				.then(res => {
// 					if (res.error) {
// 						dispatch(message(res.error));
// 					}
// 					else {
// 						dispatch(getMessages())
// 					}
// 				})
// 		}
// 		else {
// 			return Promise.resolve();
// 		}
// 	}
//
// export const deleteMessages = ids =>
// 	(dispatch, getState) => {
// 		if (!Array.isArray(ids)) ids = [ids];
// 		const { token } = getState().user;
// 		if (token) {
// 			postJson("/message/delete", { token, ids })
// 				.then(res => {
// 					if (res.error) {
// 						dispatch(message(res.error));
// 					}
// 					else {
// 						dispatch(getMessages())
// 						if (res.message) {
// 							dispatch(message(res.message));
// 						}
// 					}
// 				})
// 		}
// 		else {
// 			return Promise.resolve();
// 		}
// 	}
//
// export const postMessage = (heading, msg, type, target, project) =>
// 	(dispatch, getState) => {
// 		const { token } = getState().user;
// 		if (token) {
// 			postJson("/message/post", { token, heading, message: msg, type, target, project })
// 				.then(res => {
// 					if (res.error) {
// 						dispatch(message(res.error));
// 					}
// 					else if (res.message) {
// 						dispatch(message(res.message));
// 					}
// 				})
// 		}
// 		else {
// 			return Promise.resolve();
// 		}
// 	}
