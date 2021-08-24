import { GET_PREFERENCES } from "../api/preferences"

const INITIAL_STATE = {
	receiveEmail: false,
	receiveSlack: false,
	slackUserId: undefined
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PREFERENCES:
      return {
				...INITIAL_STATE,
				...action.preferences
			};
    default:
      return state;
  }
}
