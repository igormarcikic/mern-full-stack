export const LOGIN_USER_ACTION = 'LOGIN_USER_ACTION';
export const LOGOUT_USER_ACTION = 'LOGOUT_USER_ACTION';
export const REGISTER_USER_ACTION = 'REGISTER_USER_ACTION';

export const loginUser = ({data: {login}}) => {
    return {
    	type: LOGIN_USER_ACTION,
    	payload: login
    };
};

export const logoutUser = () => {
	return {
		type: LOGOUT_USER_ACTION
	};
};

export const registerUser = ({data: {register}}) => {
	return {
		type: REGISTER_USER_ACTION,
		payload: register
	}
}