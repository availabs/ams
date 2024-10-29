import { GET_USERS, GET_USERS_PREFERENCES/*, USERS_IN_GROUPS*/ } from "../api/users";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_USERS:
      console.log("do we have any preferences::", state.some(user => !!user.preferences))
      if(state.some(user => !!user.preferences)) {
        //Take new action.users, add in existing preferences
        const newUsers = action.users.map(user => ({...user, preferences: state.find(sUser => sUser.email === user.email)?.preferences ?? {} }));
        return newUsers;
      }
      else {
        return action.users
      }
    // case USERS_IN_GROUPS:
    //   return { ...state,
    //     byGroup: {
    //       ...state.byGroup,
    //       [action.group]: action.users
    //     }
    //   };
    case GET_USERS_PREFERENCES:
      const newUsers = state.map(user => ({...user, preferences: action.preferences.find(pUser => pUser.user_email === user.email)?.preferences ?? {}}))
      console.log({newUsers})
      return newUsers
    default:
      return state;
  }
}
