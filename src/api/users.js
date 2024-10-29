import { auth } from "./auth"
import { sendSystemMessage } from "../";

import { postJson, Config } from "./utils"

export const GET_USERS = "AMS::GET_USERS";
export const USERS_IN_GROUPS = "AMS::USERS_IN_GROUPS";
export const GET_USERS_PREFERENCES = "AMS::GET_USERS_PREFERENCES";


export const getUsers = () =>
	(dispatch, getState) => {
		const { token } = getState().user;
		if (token) {
			return postJson(`${ Config.AUTH_HOST }/users`, { token })
				.then(res => {
					if (res.error) {
            dispatch(auth());
						dispatch(sendSystemMessage(res.error));
					}
					else {
						dispatch({
							type: GET_USERS,
							...res
						})
					}
				})
		}
		return Promise.resolve();
	}
export const usersForGroup = group =>
	(dispatch, getState) => {
		const { token } = getState().user;
		if (token) {
			return postJson(`${ Config.AUTH_HOST }/users/bygroup`, { token, groups: [group] })
				.then(res => {
					if (res.error) {
            dispatch(auth());
						dispatch(sendSystemMessage(res.error));
					}
					else {
						dispatch({
							type: USERS_IN_GROUPS,
              group,
              ...res
						})
					}
				})
		}
		return Promise.resolve();
	}

export const assignToGroup = (user_email, group_name) =>
	(dispatch, getState) => {
		const { token, email } = getState().user;
		if (token) {
			return postJson(`${ Config.AUTH_HOST }/user/group/assign`, {
					token, user_email, group_name
				})
				.then(res => {
					if (res.error) {
            dispatch(auth());
						return dispatch(sendSystemMessage(res.error));
					}
					else {
						return dispatch(getUsers())
              .then(() => {
                if (email === user_email) {
                  dispatch(auth());
                }
              })
              .then(() => {
    						if (res.message) {
    							return dispatch(sendSystemMessage(res.message));
    						}
              })
					}
				})
		}
		return Promise.resolve();
	}
export const removeFromGroup = (user_email, group_name) =>
	(dispatch, getState) => {
		const { token, email } = getState().user;
		if (token) {
			return postJson(`${ Config.AUTH_HOST }/user/group/remove`, {
					token, user_email, group_name
				})
				.then(res => {
					if (res.error) {
            dispatch(auth());
						dispatch(sendSystemMessage(res.error));
					}
					else {
						return dispatch(getUsers())
              .then(() => {
                if (email === user_email) {
                  dispatch(auth());
                }
              })
              .then(() => {
    						if (res.message) {
    							dispatch(sendSystemMessage(res.message));
    						}
              })
					}
				})
		}
		return Promise.resolve();
	}

export const deleteUser = user_email =>
	(dispatch, getState) => {
		const { token } = getState().user;
		if (token) {
			return postJson(`${ Config.AUTH_HOST }/user/delete`, { token, user_email })
				.then(res => {
					if (res.error) {
            dispatch(auth());
						dispatch(sendSystemMessage(res.error))
					}
					else {
						// dispatch(getRequests());
						dispatch(getUsers());
						dispatch(auth());
						if (res.message) {
							dispatch(sendSystemMessage(res.message));
						}
					}
				})
		}
		return Promise.resolve();
	}

export const createFake = () =>
	(dispatch, getState) => {
  	const { token } = getState().user;
  	if (token) {
  		return postJson(`${ Config.AUTH_HOST }/user/create/fake`, { token })
  			.then(res => {
  				if (res.error) {
            dispatch(auth());
  					dispatch(sendSystemMessage(res.error));
  				}
  				else {
  					dispatch(getUsers());
  					dispatch(sendSystemMessage(res.message, { duration: 10000 }));
  				}
  			})
  	}
  	return Promise.resolve();
	}

	export const getUsersPreferences = ({userEmails=[], preferenceKey=''}) =>
		(dispatch, getState) => {
			const { token } = getState().user;
			if (token) {
				const { AUTH_HOST, PROJECT_NAME } = Config();
				postJson(`${ AUTH_HOST }/users/preferences`, { token, userEmails, preferenceKey })
					.then(res => {
						if (res.error) {
							dispatch(sendSystemMessage(res.error));
						}
						else {
							console.log("dispatching after getting prefer::", res)
							dispatch({
								type: GET_USERS_PREFERENCES,
								preferences: res.preferences || {}
							})
						}
					})
			}
			else {
				return Promise.resolve();
			}
		}