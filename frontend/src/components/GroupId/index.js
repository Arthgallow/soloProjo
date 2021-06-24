import React,{useEffect, useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import {Redirect, Link} from 'react-router-dom'
import { getGroups} from '../../store/groupsSession'
import "./GroupId.css"


const GroupId = () =>{
    const sessionUser = useSelector(state=>state.session.user)
    if(!sessionUser){
        return(
            <Redirect exact to="/" />
            )
    }


    return (
        <>
        <div id="groupIdPageBox">

            <h1>Groups by id</h1>
        </div>
        </>
    )
}

export default GroupId;
