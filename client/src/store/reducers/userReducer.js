import { LOGIN_USER_ACTION, LOGOUT_USER_ACTION, REGISTER_USER_ACTION } from '../actions/userActions';

const initialUser = {
	user: null,
	loggedIn: false
};

const loginReducer = (state = initialUser, action) => {
    switch(action.type) {
    	case REGISTER_USER_ACTION: 
    		return {
    			user: action.payload,
    			loggedIn: true
    		}
    	case LOGIN_USER_ACTION:
    		return {
    			user: action.payload,
    			loggedIn: true
    		}
    	case LOGOUT_USER_ACTION: 
    		return {
    			user: null,
    			loggedIn: false
    		}
    	default:
    		return state
    }
};

export default loginReducer;