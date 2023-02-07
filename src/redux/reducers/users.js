import { ADD_EMAIL } from "../actions";

const INITIAL_STATE = {globalEmail: ''};

function users(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_EMAIL:
      return {
        ...state,
        globalEmail: action.payload
      }
    default:
      return state;
 }
}

export default users;