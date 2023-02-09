import { ADD_EXPENSES, ADD_TOTAL, SUB_TOTAL, CALL_API, UPDATE_EXPENSES } from "../actions";

const INITIAL_STATE = {
  totalValue: 0,
  APIcoins: [],
  APIinfo: [],
  allExpenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_TOTAL:
      return {
        ...state,
        totalValue: (state.totalValue + (+action.payload)),
      }
    case SUB_TOTAL:
      return {
        ...state,
        totalValue: (Math.abs(state.totalValue - (+action.payload)))
      }
    case CALL_API:
      return {
        ...state,
        APIcoins: Object.keys(action.payload),
        APIinfo: Object.values(action.payload)
      }
    case ADD_EXPENSES:
      return {
        ...state,
        allExpenses: [...state.allExpenses, action.payload]
      }
    case UPDATE_EXPENSES:
      return {
        ...state,
        allExpenses: action.payload
      }
    default:
      return state;
 }
}

export default wallet;