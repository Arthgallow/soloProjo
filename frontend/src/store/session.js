import { csrfFetch } from './csrf';

const SET_USER = "session/SET_USER"
const REMOVE_USER = "session/REMOVE_USER"


const setUser = (user)=>{
    return {
        type: SET_USER,
        payload: user,
    }
}

const removeUser = ()=>{
    return{
        type: REMOVE_USER,
    }
}

export const logout = () => async (dispatch) => {

    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    // let res = response.json()
    // dispatch(removeUser(response))
    return response
}

export const signup = (user) => async (dispatch) => {
    const {email, username ,password} = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, username, password})
    });
    if(response.ok){
        const data = await response.json();
        document.querySelector(".bg").classList.remove("bg")
        dispatch(setUser(data.user))
        return response
    }

}

export const login = (user) => async (dispatch) => {
    const {credential, password} = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({credential, password})
    });
    if(response.ok) {
        const data = await response.json();
        // document.querySelector(".bg").classList.remove("bg")
        dispatch(setUser(data.user))
        return response
    }
};

export const restoreUser = () => async dispatch => {
    const response = await csrfFetch('/api/session');
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  };

const initialState = {user:null}

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case SET_USER:
            newState = Object.assign({}, state);
            newState.user = action.payload;
            return newState
        case REMOVE_USER:
            newState = Object.assign({}, state);
            newState.user = {user:null};

            return newState

        default:
            return state
    }
}

export default sessionReducer;
