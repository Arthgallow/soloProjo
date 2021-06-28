import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getOneGroup } from '../../store/groupsSession';
import { makeGroup, editOneGroup } from '../../store/groupsSession';

import "./EditGroup.css"



const EditGroup = ({ groupId, hideForm}) => {

    let history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state.session.user);
    const sessionGroups = useSelector(state=>state.group)
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');


    let group = sessionGroups[groupId]

    const handleSubmit = async (e) =>{
        e.preventDefault();

        let updatedGroup = {
            ...group,
            groupName,
            description:groupDescription,
        }

        let id = parseInt(updatedGroup.id)
        if(updatedGroup){
            updatedGroup = await dispatch(editOneGroup(updatedGroup))
            history.push(`/groups/${id}`)
            hideForm();
        }
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
    }

    return(
        <div className="editBackground">
            <div>
                <form id="editGroupForm" onSubmit={handleSubmit}>
                    <input className="editFormNameInput"
                        required
                        value={groupName}
                        placeholder={'Group Name'}
                        onChange={(e)=>setGroupName(e.target.value)}
                        />
                    <input className="editFormGroupDescriptionInput"
                        required
                        value={groupDescription}
                        placeholder={"Group Description"}
                        onChange={(e)=>setGroupDescription(e.target.value)}
                        />
                    <button type="submit" >Update Group</button>
                    <button type="reset" onClick={handleCancelClick}>Cancel</button>
                </form>
            </div>
        </div>
    )
}


export default EditGroup;
