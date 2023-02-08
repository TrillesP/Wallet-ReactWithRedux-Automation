export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_TOTAL = 'ADD_TOTAL';
export const CALL_API = 'CALL_API';
export const ADD_EXPENSES = 'ADD_EXPENSES';

export const addEmail = (email) => ({
    type: ADD_EMAIL,
    payload: email,
})

export const addTotal = (value) => ({
    type: ADD_TOTAL,
    payload: value,
})

export const addExpenses = (infoCambio) => ({
  type: ADD_EXPENSES,
  payload: infoCambio,
})

export const APItoReducer = (data) => ({
    type: CALL_API,
    payload: data
})

export const fetchAPI = () => async (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
            .then((response) => response.json())
            .then((data) => {
              delete data.USDT;
              delete data.DOGE;
              delete data.BTC
              delete data.ETH;
              delete data.LTC;
              delete data.XRP;
              dispatch(APItoReducer(data))
            });
}