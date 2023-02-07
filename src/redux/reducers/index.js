import { combineReducers } from 'redux';
import users from './users';
import wallet from './wallet';

const rootReducer = combineReducers({ users, wallet });

export default rootReducer;