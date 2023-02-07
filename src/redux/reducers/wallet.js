import { ADD_TOTAL } from "../actions";

const INITIAL_STATE = { totalValue: 0 };

function wallet(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_TOTAL:
      return {
        ...state,
        totalValue: (state.totalValue + action.payload)
      }
    default:
      return state;
 }
}

export default wallet;