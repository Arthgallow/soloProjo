import { csrfFetch } from "./csrf";

const ADD_GROUP = "session/ADD_GROUP";
const LOAD_GROUPS = "session/LOAD_GROUPS";
const REMOVE_GROUP ="session/DELETE_GROUP";


const addGroup = (group) => {
    return {
        type: ADD_GROUP,
        payload: group,
    }
};
const loadGroups = (groups) => {
    return {
        type: LOAD_GROUPS,
        groups
    }
}

const removeGroup = (group) => {
    return{
        type: REMOVE_GROUP,
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
        dispatch(addGroup(data.group))
        return data
    }
}

export const editOneGroup = (editedGroup) => async (dispatch) => {
    const response = await fetch(`/api/groups/${editedGroup.id}`, {
        method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(editedGroup),
    })
    if (response.ok){
        const editedSingleGroupe = await response.json();
        dispatch(addGroup(editedSingleGroupe))
    }
}


const initialState = {
	groups: [],
	types: [],
};

const sortList = (list) => {
	return list
		.sort((groupA, groupB) => {
			return groupA.no - groupB.no;
		})
		.map((group) => group.id);
};

const groupReducer = (state=initialState, action) =>{
    switch(action.type){
        case LOAD_GROUPS:{
            const allGroups = []
            action.groups.forEach((group)=>{
                allGroups.push(group)
            })
            return {
                ...allGroups,
                ...state,

            }
        }
        default:
            return state
    }
}

export default groupReducer;
