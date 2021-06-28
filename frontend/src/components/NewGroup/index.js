import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getGroups, makeGroup } from '../../store/groupsSession';
import "./NewGroup.css"

const NewGroup  = ({hideForm})=> {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state=>state.session.user);
    const sessionGroups = useSelector(state => state.group);

    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    useEffect(()=>{
        dispatch(getGroups())
    }, [dispatch])

    const handleSubmit = async (e) =>{
        e.preventDefault();

        let newGroup = {
            groupName,
            description,
            userId: sessionUser.id,
            goalId: 0

        }

        if(newGroup){
            newGroup = await dispatch(makeGroup(newGroup))
            hideForm();
        }
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
    }

    return (
    <>
        <div className="newGroupBackg">
            <div className="newGroupFormBord">
                <form className="newGroupForm" onSubmit={handleSubmit}>
                    <input className="cardName" type="text"
                        placeholder="Group Name"
                        required
                        value={groupName}
                        onChange={(e)=>setGroupName(e.target.value)} />
                    <input className="cardDescription" type="text"
                        placeholder="Group Description"
                        required
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)} />

                    <button type="submit">Create Group</button>
                    <button type="reset" onClick={handleCancelClick}>Cancel</button>
                </form>
            </div>
        </div>
    </>
    )
}

export default NewGroup;
