import { csrfFetch } from "./csrf";

const ADD_COMMENT = "session/ADD_COMMENT"
const LOAD_COMMENTS = "session/LOAD_COMMENT"
const REMOVE_COMMENT = "session/DELETE_COMMENT"

const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        comment,
    };
};

const loadComments = (comments) => {
    return {
        type:LOAD_COMMENTS,
        comments,
    };
};

const removeComment = (comment)=>{
    return {
        type:REMOVE_COMMENT,
    };
};

export const getComments = () => async (dispatch) => {
    const response = await csrfFetch('/api/comments');

    if(response.ok){
        const  comments = await response.json();
        dispatch(loadComments(comments))
        return response;
    }
}

export const getOneComment = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/comments/${id}`)

    if(response.ok){
        const singleComment = await response.json();
        dispatch(addComment(singleComment))
        return singleComment
    }
}

export const makeComment = (givenComment) => async (dispatch) =>{
    const {    userId, goalId, groupId, mediaId, comment,} = givenComment;
    const response = await csrfFetch('api/comments', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ userId, goalId, groupId, mediaId, comment})
    });
    if(response.ok){
        const data = await response.json();
        dispatch(addComment(data))
        return data
    }
}

export const editOneComment = (editedComment) => async (dispatch) => {
    console.log(editedComment)
    const response = await csrfFetch(`/api/comments/${editedComment.id}`, {
        method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(editedComment),
    })
    if (response.ok){
        const editedSingleComment = await response.json();
        dispatch(addComment(editedSingleComment))
        return editedSingleComment
    }
}

export const deleteComment = (id) => async (dispatch) => {
    let thisId = parseInt(id)
    const response = await csrfFetch (`/api/comments/${thisId}`,
    {method: "DELETE"})
    if(response.ok){
        const comment = await response.json
        dispatch(removeComment(comment))
        return response
    }
}


const initialState = { };

const sortList = (list) => {
	return list
		.sort((groupA, groupB) => {
			return groupA.id - groupB.id;
		})
		.map((group) => group.id);
};

const commentReducer = (state=initialState, action) =>{
    switch(action.type){
        case LOAD_COMMENTS:{
            const allComments = {}
            action.comments.forEach((comment)=>{
                allComments[comment.id] = comment
            })
            return {
                ...state,
                ...allComments
            }
        }
        case ADD_COMMENT:{
            if (!state[action.comment.id]) {
				const newState = {
					...state,
					[action.comment.id]: action.comment,
				};
				return newState ;
			}
			return {
				[action.comment.id]: {
					...state[action.comment.id],
					...action.comment,
				},
			};
        }
        case REMOVE_COMMENT: {
            const newState = {...state};
            delete newState[action.comment.id];

            return newState
        }
        default:
            return state
    }
}

export default commentReducer;
