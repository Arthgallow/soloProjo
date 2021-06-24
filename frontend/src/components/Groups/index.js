import React,{useEffect, useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import {Redirect, Link} from 'react-router-dom'
import { getGroups} from '../../store/groupsSession'
import "./Groups.css"


const Groups = () => {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state=>state.session.user)
    const sessionGroups = useSelector(state => state.group)

    const groups = []
    for(const group in sessionGroups){
        groups.push(sessionGroups[group])
    }


    useEffect(()=>{
        dispatch(getGroups())
    },[dispatch])


    if(!sessionUser){
        return(
            <Redirect exact to="/" />
            )
    }

    return (
        <>
        <div id="groupPageBox">

            <div id="sidePannel">
                <h1>Welcom to the club</h1>
            </div>
            <div className="groupsBoard">
                {groups.map((group)=>(
                    <div className="groupCard">
                        <div className="cardName">
                            <Link exact to={`/groups/${group.id}`}>
                                <h1>{group.groupName} </h1>
                            </Link>
                        </div>
                        <div className="cardDescription">
                            <h3>{group.description}</h3>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                {

                }
            </div>
        </div>
        </>
    )
}

export default Groups;
