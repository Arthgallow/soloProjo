import React,{useEffect, useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import {Redirect, Link, NavLink} from 'react-router-dom'
import { editOneGroup, getGroups, getOneGroup} from '../../store/groupsSession'
import NewGroup from "../NewGroup"
import Comments from "../Comments"
import NewComment from "../NewComment"
import EditGroup from "../EditGroup"
import "./Groups.css"



const Groups = () => {
    if(document.querySelector("#splachBackground")){
        document.querySelector("#splachBackground").classList.remove("bg")
    }

    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state.session.user);
    const sessionGroups = useSelector(state => state.group);

    const [showMakeNewGroup, setShowMakeNewGroup] = useState(false);
    const [showEditGroup, setShowEditGroup] = useState(false)

    const groups = []
    for(const group in sessionGroups){
        groups.push(sessionGroups[group])
    }

    useEffect(()=>{
        dispatch(getGroups())
        setShowMakeNewGroup(false)
        setShowEditGroup(false)
    },[dispatch, sessionGroups.length]);

    let newGroupContent = null;


    if(showMakeNewGroup){
        newGroupContent = (
            <NewGroup
            hideForm={()=>setShowMakeNewGroup(false)}
            />
        )
    }

    let bottomPannel;

            if(sessionUser){
                return (
                <>
                <div id="groupPageBox">

                    <div id="groupPannel" className="groupsBoard">
                        <div className="groupCard">
                            <div>
                                {!showMakeNewGroup && (
                                    <button onClick={()=> setShowMakeNewGroup(true)}>
                                        <h1 >Make New Group</h1>
                                    </button>
                                )}
                                {newGroupContent}
                            </div>
                        </div>
                        {groups.map((group)=>(

                            <div className="groupCard">

                                <div className="cardHeader">

                                    <Link key={group.id} className="groupLink"  to={`/groups/${group.id}`}>
                                        <h1 className="groupName">{group.groupName} </h1>
                                    </Link>

                                    <div className="cardDescription">
                                        <h3 className="groupDescription">{group.description}</h3>
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
                        ))}
                    </div>
                    <div>
                        {bottomPannel}
                    </div>
                </div>
                </>
            )
}




    else if(!sessionUser){return (
        <>
        <div id="groupPageBox">

            <div id="groupPannel" className="groupsBoard">

             {groups.map((group)=>(

                    <div className="groupCard">
                        <div className="cardHeader">
                            <Link key={group.id} className="groupLink"  to={`/groups/${group.id}`}>
                                <h1 className="groupName">{group.groupName} </h1>
                            </Link>
                            <div className="cardDescription">
                                <h3 className="groupDescription">{group.description}</h3>
                            </div>

                        </div>
                        <div className="mediaBox">

                        </div>
                        <div className="cardBody">
                            <Comments group={group}/>
                        </div>


                    </div>
                ))}
            </div>
            <div>
                {bottomPannel}
            </div>
        </div>
        </>
    )}
}

export default Groups;
