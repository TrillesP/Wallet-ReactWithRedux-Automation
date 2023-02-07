export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_TOTAL = 'ADD_TOTAL';

export const addEmail = (email) => ({
    type: ADD_EMAIL,
    payload: email,
  })

export const addTotal = () => ({
    type: ADD_TOTAL,
    payload: totalValue,
})