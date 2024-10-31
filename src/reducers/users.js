import { GET_USERS, GET_USERS_PREFERENCES, GET_LOGINS/*, USERS_IN_GROUPS*/ } from "../api/users";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS:
      if(state.some(user => !!user.preferences) || state.some(user => !!user.logins)) {
        const newUsers = action.users.map((user) => {
          const stateUser = state.find((sUser) => sUser.email === user.email) ?? {};
          return ({
            ...stateUser,
            ...user
          })
        });
        return newUsers;
      }
      else {
        return action.users;
      }
    // case USERS_IN_GROUPS:
    //   return { ...state,
    //     byGroup: {
    //       ...state.byGroup,
    //       [action.group]: action.users
    //     }
    //   };
    case GET_USERS_PREFERENCES:
      const newUsers = state.map((user) => ({
        ...user,
        preferences:
          action.preferences.find((pUser) => pUser.user_email === user.email)
            ?.preferences ?? {},
      }));
      return newUsers;
    case GET_LOGINS:
      if(!state.some(user => !!user.logins)){
        action.logins.forEach((loginRow) => {
          const userEmail = loginRow.user_email;
            const stateUser = state.find(user => user.email === userEmail);
            if (stateUser) {
              if(!stateUser.logins) {
                stateUser.logins = 0;
              }
              stateUser.logins++;
  
              if(!stateUser.lastLogin || loginRow.created_at < stateUser.lastLogin) {
                stateUser.lastLogin = loginRow.created_at;
              }
            }
        })
      }

      return state;
    default:
      return state;
  }
}
