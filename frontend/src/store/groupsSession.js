import { csrfFetch } from "./csrf";

const ADD_GROUP = "session/ADD_GROUP";
const LOAD_GROUPS = "session/LOAD_GROUPS";
const REMOVE_GROUP ="session/DELETE_GROUP";


const addGroup = (group) => {
    return {
        type: ADD_GROUP,
        group,
    }
};

const loadGroups = (groups) => {
    return {
        type: LOAD_GROUPS,
        groups
    }
}

const removeGroup = (groups) => {
    return{
        type: REMOVE_GROUP,
        groups
    }
};

export const getGroups = () => async (dispatch) => {
    const response = await csrfFetch('/api/groups');

    if(response.ok){
        const  groups = await response.json();
        dispatch(loadGroups(groups))
        return response;
    }
}

export const getOneGroup = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${id}`)

    if(response.ok){
        const singleGroup = await response.json();
        dispatch(addGroup(singleGroup))
        return singleGroup
    }
}

export const makeGroup = (group) => async (dispatch) =>{
    const {groupName, description, userId, goalId} = group;
    const response = await csrfFetch('api/groups', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({groupName, description, userId, goalId})
    });
    if(response.ok){
        const data = await response.json();
        dispatch(addGroup(data))
        return data
    }
}

export const editOneGroup = (editedGroup) => async (dispatch) => {
    const response = await csrfFetch(`/api/groups/${editedGroup.id}`, {
        method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(editedGroup),
    })
    if (response.ok){
        const editedSingleGroup = await response.json();
        dispatch(addGroup(editedSingleGroup))
        return editedSingleGroup
    }
}

export const deleteGroup = (id) => async (dispatch) => {

    let thisId = parseInt(id);
    const response = await csrfFetch (`/api/groups/${thisId}`,
    {method: "DELETE"});
    if(response.ok){
        const group = await response.json();
        dispatch(removeGroup(group))
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

const groupReducer = (state=initialState, action) =>{
    switch(action.type){
        case LOAD_GROUPS:{
            const allGroups = {}
            action.groups.forEach((group)=>{
                allGroups[group.id] = group
            })
            return {
                ...state,
                ...allGroups,

            }
        }
        case ADD_GROUP:{
            if (!state[action.group.id]) {
				const newState = {
					...state,
					[action.group.id]: action.group,
				};
				return newState ;
			}
			return {

				[action.group.id]: {
					...state[action.group.id],
					...action.group,
				},
			};
        }
        case REMOVE_GROUP: {
            let newState = action.comments
            return newState
        }
        default:
            return state
    }
}

export default groupReducer;
