import { authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';


let initialState = {
	auth:{
			id: null,
      		email: null,
      		login: null,
      		isAuth: false
		}};

const authReducer = (state = initialState, action) => {
	
	switch (action.type) {
		case SET_USER_DATA: 
			return {
				...state,
				...action.data,
				isAuth: true
				}	
		default:
			return state;
}}

export const setAuthUserData = (email, id, login) => ({type: SET_USER_DATA, data: {email, id, login} });

export const getAuthData = () => (dispatch) => {
	authAPI.authMe()
	.then(response => {
		if (response.data.resultCode === 0) {
			let {id, email, login} = response.data.data;
			dispatch(setAuthUserData(id, email, login));
		}
	});
	}
 
export default authReducer;