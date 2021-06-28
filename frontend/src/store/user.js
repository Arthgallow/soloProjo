import { csrfFetch } from './csrf';

const LOAD_USERS = "session/LOAD_USERS"

const loadUsers = (users)=>{
    return {
        type: LOAD_USERS,
        users,
    }
}

export const getUsers = () => async (dispatch) => {
    const response = await csrfFetch('/api/users')
    if(response.ok){
        const users = await response.json();
        dispatch(loadUsers(users))
        return response
    }
}

    const initialState = {}

const userReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case LOAD_USERS:
            const myUsers = {}
            action.users.forEach(element => {
                myUsers[element.id] = element
            })
            return {
                ...state,
                ...myUsers
            }
        default:
            return state
    }
}

export default userReducer;
