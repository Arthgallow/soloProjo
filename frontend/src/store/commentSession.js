import { csrfFetch } from "./csrf";

const ADD_COMMENT = "session/ADD_COMMENT"
const EDIT_COMMENT = "session/EDIT_COMMENT"
const DELETE_COMMENT = "session/DELETE_COMMENT"

const setComment = (comment) => {
    return {
        type: ADD_COMMENT,
        payload: comment,
    };
};

const editComment = (comment) => {
    return {
        type:EDIT_COMMENT,
        payload: comment,
    };
};

const deleteComment = (comment)=>{
    return {
        type:DELETE_COMMENT,
        payload: comment,
    };
};

export const addNewComment = (comments) => async (dispatch) => {
    const {comment} = comments;
    const response = await csrfFetch('/api/commentSession', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({comment})
    })
    if(response.ok){
        const data = await response.json()
        dispatch(setComment(data.comments))
    }
        return response
}

const initialState = {}

const commentReducer = (state=initialState, action)=>{
    let newState;
    switch(action.type){
        case ADD_COMMENT:
            newState = Object.assign ({}, state)
            newState.comment = action.payload
            return newState
        default:
            return state
    }
}

export default commentReducer;
