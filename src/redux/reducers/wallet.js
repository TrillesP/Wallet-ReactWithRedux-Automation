import { ADD_EXPENSES, ADD_TOTAL, CALL_API } from "../actions";

const INITIAL_STATE = {
  totalValue: 0,
  APIcoins: [],
  APIinfo: [],
  infoCambio: '',
  allExpenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_TOTAL:
      return {
        ...state,
        totalValue: (state.totalValue + (+action.payload)),
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
        infoCambio: action.payload,
        allExpenses: [...state.allExpenses, action.payload]
      }
    default:
      return state;
 }
}

export default wallet;