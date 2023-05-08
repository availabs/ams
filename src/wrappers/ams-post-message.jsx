import React from "react"

import { connect } from "react-redux"

import { sendSystemMessage } from "../messages/reducer";

import {
  postMessage,
  getMessages,
  getUsers,
  getGroups
} from "../api"

import { Config } from "../api/utils"

export const MessageTypes = [
  "user", "users", "group", "project"
]

const InitialState = {
  heading: "",
  message: "",
  type: "",
  target: "",
  filterGroups: []
}
const Reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "update-state":
      return {
        ...state,
        ...payload
      }
    default:
      return state;
  }
}

export const postMessageWrapper = Component => {
  const Wrapper = ({ getUsers,
                      getGroups,
                      users,
                      groups,
                      projectName,
                      postMessage,
                      sendSystemMessage,
                      ...props }) => {

    React.useEffect(() => {
      getUsers();
      getGroups();
    }, [getUsers, getGroups]);

    const [postState, dispatch] = React.useReducer(Reducer, InitialState);

    const filteredUsers = React.useMemo(() => {

      const { filterGroups } = postState;

      const fgMap = filterGroups.reduce((a, c) => {
        a[c] = true;
        return a;
      }, {});

      return users.filter(({ projects }) => {
        return projects.reduce((a, c) => {
          return a || c.project_name === projectName;
        }, false);
      })
      .filter(({ groups }) => {
        return groups.reduce((a, c) => {
          return a || fgMap[c];
        }, !Boolean(filterGroups.length))
      })
      .sort((a, b) => a.email.localeCompare(b.email));
    }, [users, projectName, postState]);

    const filteredGroups = React.useMemo(() => {
      return groups.filter(({ projects }) => {
        return projects.reduce((a, c) => {
          return a || c.project_name === projectName;
        }, false);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    }, [groups, projectName]);

    const updatePostState = React.useCallback(payload => {
      if ("type" in payload) {
        payload.target = "";
      }
      if (payload.type === "project") {
        payload.target = projectName;
      }
      dispatch({
        type: "update-state",
        payload
      });
    }, [projectName, dispatch]);

    const canPostMessage = React.useMemo(() => {
      const {
        heading,
        message,
        type,
        target
      } = postState;

      return Boolean(heading && message && type && target);
    }, [postState]);

    const doPostMessage = React.useCallback(() => {
      if (!canPostMessage) return;

      const {
        heading,
        message,
        type,
        target
      } = postState;

      return postMessage(heading, message, type, target);
    }, [postMessage, postState, canPostMessage]);

    return (
      <Component { ...props }
        canPostMessage={ canPostMessage }
        postMessage={ doPostMessage }
        updatePostState={ updatePostState }
        postState={ postState }
        users={ filteredUsers }
        groups={ filteredGroups }/>
    )
  }
  const mapStateToProps = state => ({
    messages: state.messages,
    users: state.users,
    groups: state.groups,
    projectName: Config.PROJECT_NAME
  })
  const mapDispatchToProps = {
    postMessage,
    getMessages,
    getUsers,
    getGroups,
    sendSystemMessage
  }
  return connect(mapStateToProps, mapDispatchToProps)(Wrapper);
}

export default postMessageWrapper;
