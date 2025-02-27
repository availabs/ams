import { auth } from "./auth"
import { getUsers } from "./users"
import { sendSystemMessage } from "../";

import { postJson, Config } from "./utils"

export const GET_GROUPS = "AMS::GET_GROUPS";

export const getGroups = () =>
	(dispatch, getState) => {
		const { token } = getState().user;
		if (token) {
			return postJson(`${ Config.AUTH_HOST }/groups`, { token })
				.then(res => {
					if (res.error) {
						dispatch(auth());
						dispatch(sendSystemMessage(res.error));
					}
					else {
						dispatch({
							type: GET_GROUPS,
              ...res
						});
					}
				})
		}
		else {
			return Promise.resolve();
		}
	}

export const groupsForProject = () =>
	(dispatch, getState) => {
		const { token } = getState().user;
		const { AUTH_HOST, PROJECT_NAME } = Config();
		if (token) {
			return postJson(`${ AUTH_HOST }/groups/byproject`, { token, project: PROJECT_NAME })
				.then(res => {
					if (res.error) {
						dispatch(auth());
						dispatch(sendSystemMessage(res.error));
					}
					else {
						dispatch({
							type: GET_GROUPS,
              ...res
						});
					}
				})
		}
		else {
			return Promise.resolve();
		}
	}

export const createGroup = name =>
	(dispatch, getState) => {
		const { token } = getState().user;
		if (token) {
			return postJson(`${ Config.AUTH_HOST }/group/create`, { token, name })
				.then(res => {
					if (res.error) {
						dispatch(auth());
						dispatch(sendSystemMessage(res.error));
					}
					else {
						dispatch(getGroups());
						if (res.message) {
							dispatch(sendSystemMessage(res.message));
						}
					}
				})
		}
		else {
			return Promise.resolve();
		}
	}
export const deleteGroup = name =>
	(dispatch, getState) => {
		const { token, groups } = getState().user;
		if (token) {
			return postJson(`${ Config.AUTH_HOST }/group/delete`, { token, name })
				.then(res => {
					if (res.error) {
						dispatch(auth());
						dispatch(sendSystemMessage(res.error));
					}
					else {
            if (groups.includes(name)) {
              dispatch(auth());
            }
            dispatch(getUsers());
						dispatch(getGroups());
						if (res.message) {
							dispatch(sendSystemMessage(res.message));
						}
					}
				})
		}
		else {
			return Promise.resolve();
		}
	}
export const createAndAssign = (group_name, auth_level, meta={}) =>
	(dispatch, getState) => {
		const { token } = getState().user;
		if (token) {
			return postJson(`${ Config.AUTH_HOST }/group/create/project/assign`, {
					token, group_name, meta, project_name: Config.PROJECT_NAME, auth_level
				})
				.then(res => {
					if (res.error) {
						dispatch(auth());
						dispatch(sendSystemMessage(res.error));
					}
					else {
						dispatch(getGroups());
						if (res.message) {
							dispatch(sendSystemMessage(res.message));
						}
					}
				})
		}
		else {
			return Promise.resolve();
		}
	}

export const assignToProject = (group_name, auth_level) =>
	(dispatch, getState) => {
		const { token, groups } = getState().user;
		if (token) {
			return postJson(`${ Config.AUTH_HOST }/group/project/assign`, {
					token, group_name, project_name: Config.PROJECT_NAME, auth_level
				})
				.then(res => {
					if (res.error) {
						dispatch(auth());
						dispatch(sendSystemMessage(res.error));
					}
					else {
            if (groups.includes(group_name)) {
              dispatch(auth());
            }
						dispatch(getGroups());
						if (res.message) {
							dispatch(sendSystemMessage(res.message));
						}
					}
				})
		}
		else {
			return Promise.resolve();
		}
	}
export const removeFromProject = group_name =>
	(dispatch, getState) => {
		const { token, groups } = getState().user;
		if (token) {
			return postJson(`${ Config.AUTH_HOST }/group/project/remove`, {
					token, group_name, project_name: Config.PROJECT_NAME
				})
				.then(res => {
					if (res.error) {
						dispatch(auth());
						dispatch(sendSystemMessage(res.error));
					}
					else {
            if (groups.includes(group_name)) {
              dispatch(auth());
            }
						dispatch(getGroups());
            dispatch(getUsers());
						if (res.message) {
							dispatch(sendSystemMessage(res.message));
						}
					}
				})
		}
		else {
			return Promise.resolve();
		}
	}

export const adjustAuthLevel = (group_name, auth_level) =>
	(dispatch, getState) => {
		const { token } = getState().user;
		if (token) {
			return postJson(`${ Config.AUTH_HOST }/group/project/adjust`, {
					token, group_name, project_name: Config.PROJECT_NAME, auth_level
				})
				.then(res => {
					if (res.error) {
						dispatch(auth());
						dispatch(sendSystemMessage(res.error));
					}
					else {
						dispatch(getGroups());
						if (res.message) {
							dispatch(sendSystemMessage(res.message));
						}
					}
				})
		}
		else {
			return Promise.resolve();
		}
	}

	export const updateGroupMeta = (group_name, meta) =>
		(dispatch, getState) => {
			const { token } = getState().user;
			if (token) {
				return postJson(`${ Config.AUTH_HOST }/group/meta/update`, {
						token, group_name, meta
					})
					.then(res => {
						if (res.error) {
							dispatch(auth());
							dispatch(sendSystemMessage(res.error));
						}
						else {
							dispatch(getGroups());
							if (res.message) {
								dispatch(sendSystemMessage(res.message));
							}
						}
					})
			}
			else {
				return Promise.resolve();
			}
		}
