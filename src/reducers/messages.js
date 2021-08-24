import { GET_MESSAGES } from "../api/messages"

const INITIAL_STATE = []

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case GET_MESSAGES:
			return action.messages;
		default:
			return state;
	}
}
