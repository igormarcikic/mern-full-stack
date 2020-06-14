import { combineReducers } from 'redux';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
    CurrentUser: loginReducer
});

export default rootReducer;