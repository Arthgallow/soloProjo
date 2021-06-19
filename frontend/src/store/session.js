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

export const login = (user) => async (dispatch) => {
    const {credential, password} = user;
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({credential, password})
    });

    const data = await response.json()
    console.log(user)
    dispatch(setUser(data.user))
    return response
};

const initialState = {user:null}

const sessionReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case SET_USER:
            newState = Object.assign({}, state)
            newState.user = action.payload
            return newState
        case REMOVE_USER:
            newState = Object.assign({}, state)
            return newState
        default:
            return state
    }
}

export default sessionReducer;