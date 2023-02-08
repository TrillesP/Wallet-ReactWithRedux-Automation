export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_TOTAL = 'ADD_TOTAL';

export function addEmail(email) {
  return {
    type: ADD_EMAIL,
    payload: email,
  }
}

export function addTotal(value) {
  return {
    type: ADD_TOTAL,
    payload: value,
  }
}