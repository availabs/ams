import { GET_SLACK_USER } from "../api/slacker"

const INITIAL_STATE = {
  profile: { email: undefined },
  id: undefined
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SLACK_USER:
      return action.slacker;
    default:
      return state;
  }
}
