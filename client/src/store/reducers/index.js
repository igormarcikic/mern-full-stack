import { combineReducers } from 'redux';
import userReducer from './userReducer';

const rootReducer = combineReducers({
    CurrentUser: userReducer,
});

export default rootReducer;