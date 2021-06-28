import React,{useEffect, useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import {Redirect, Link, useParams, useHistory} from 'react-router-dom'
import { getGroups, getOneGroup, deleteGroup} from '../../store/groupsSession'
import { getOneComment } from "../../store/commentSession"
import Comments from "../Comments"
import NewComment from "../NewComment"
import EditGroup from "../EditGroup"
import "./GroupId.css"


const GroupId = () =>{
    if(document.querySelector("#splachBackground")){
        document.querySelector("#splachBackground").classList.remove("bg")
    }
    let history = useHistory()
    const dispatch = useDispatch();

    const sessionUser = useSelector(state=>state.session.user);
    const sessionGroups = useSelector(state => state.group);
    const allUsers = useSelector(state=>state.users)
    const sessionComments = useSelector(state =>state.comment)

    const [showEditGroup, setShowEditGroup] = useState(false)
    const {groupId} = useParams();

    const groups = []
    for(const group in sessionGroups){
        groups.push(sessionGroups[group])
    }
    useEffect(()=>{
        dispatch(getGroups())
        setShowEditGroup(false)
        dispatch(getOneComment())
    },[dispatch, showEditGroup])




    let editGroupContent;
    if(showEditGroup){
        editGroupContent = (
            <EditGroup
            hideForm={()=>setShowEditGroup(false)}
            groupId={groupId}
            />
        )
    }

    let editButton =
        (<div>
            {!showEditGroup && (
                <button className="btn" onClick={()=> setShowEditGroup(true)}>
                   Edit Group
                </button>
            )}
            {editGroupContent}
        </div>)
        let deleteThisGroup = async ()=>{
           await dispatch(deleteGroup(groupId))
        //   return  <Redirect  to="/groups"/>

        }

        let deleteButton = (
            <button className="btn" type="button" onClick={deleteThisGroup}>Delete</button>
        )


    let addButtons = (group) => {
        if(parseInt(group.userId) === parseInt(sessionUser.id)){
            return(
                <>
                {editButton}
                {deleteButton}
                </>
            )
        }
    }

    const comments = []
    for (const comment in sessionComments){
        comments.push(sessionComments[comment])
    }
    const users = []
    for(const user in allUsers){
        users.push(allUsers[user])
    }



    if(sessionUser){return (
        <>
        {groups.map((group) =>{
            if(parseInt(group.id) === parseInt(groupId)){
                return (
                    <div id="groupIdPageBox">

                        <div id="groupPannel" className="groupBoard">

                            <div className="groupCard">
                                <div className="cardHeader">
                                    <div className="groupIdName" >
                                        <h1 className="cardName">{group.groupName} </h1>
                                    </div>
                                    <div className="cardDescription">
                                        <h3>{group.description}</h3>
                                    </div>
                                </div>

                                <div className="mediaBox">

                                </div>

                                <div className="cardBody">
                                    <Comments group={group}/>
                                </div>

                                <div className="cardNewCommentButton">
                                    <NewComment group={group} />
                                </div>

                                <div >
                                    {addButtons(group)}
                                </div>

                            </div>

                        </div>

                    </div>
                )}
            })}
        </>
    )}

    if(!sessionUser){
        return (
            <>
            {groups.map((group) =>{
                if(parseInt(group.id) === parseInt(groupId)){
                    return (
                        <div id="groupIdPageBox">

                            <div id="groupPannel" className="groupBoard">

                                <div className="groupCard">
                                    <div className="cardHeader">
                                        <div className="groupIdName" >
                                            <h1 className="cardName">{group.groupName} </h1>
                                        </div>
                                        <div className="cardDescription">
                                            <h3>{group.description}</h3>
                                        </div>
                                    </div>

                                    <div className="mediaBox">

                                    </div>

                                    <div className="cardBody">
                                        <Comments group={group}/>
                                    </div>

                                    <div className="cardNewCommentButton">
                                        <NewComment group={group} />
                                    </div>

                                </div>

                            </div>

                        </div>
                    )}
                })}
            </>
        )
    }
}

export default GroupId;
