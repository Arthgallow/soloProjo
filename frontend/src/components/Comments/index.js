import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {Redirect, Link, NavLink, e} from 'react-router-dom'
import {getComments, getOneComment, makeComment, editedComment, deleteComment } from "../../store/commentSession"
import EditComment from "../EditComment"

import { getUsers } from "../../store/user"


const Comments = ({group}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state.session.user);
    const sessionGroups = useSelector(state=>state.group)
    const allUsers = useSelector(state=>state.users)
    const sessionComments = useSelector(state => state.comment);

    const [showEditComment, setShowEditComment] = useState(false);


    useEffect(()=>{
        dispatch(getComments())
        setShowEditComment(false)
    },[dispatch])
    useEffect(()=>{
        dispatch(getUsers())
    },[dispatch])


    const comments = []
    for (const comment in sessionComments){
        comments.push(sessionComments[comment])
    }
    const users = []
    for(const user in allUsers){
        users.push(allUsers[user])
    }
    let buttons = () =>{
        return comments.map((comment)=>{
            if(comment.userId === sessionUser.id){
                return (
                    <>
                    <button>Edit</button>
                    <button>Delete</button>
                    </>
                )
            }
        })
    }

    let editCommentContent;
    let editStuff = (comment)=>{
        if(showEditComment){
        return (
            <EditComment
            comment={comment}
            hideForm={()=>setShowEditComment(false)}
            />
        )
    }}

    let userComments =()=>{ return comments.map((comment)=>{
        if(comment.groupId === group.id){
            for(let user in users ){
                if(users[user].id === comment.userId && users[user].id === sessionUser.id){
                    return (
                        <>
                            <p>{users[user].username} : {comment.comment}</p>
                            <div className="commentCard">
                                    {!showEditComment && (
                                            <button onClick={()=> setShowEditComment(true)}>
                                                Edit
                                            </button>
                                    )}
                                    {editStuff(comment)}
                            </div>
                            <button onClick={deleteComment(comment.idid)}>delete</button>
                        </>)
                } else if(users[user].id === comment.userId){
                    return (
                    <>
                        <p>{users[user].username} : {comment.comment}</p>

                    </>)
                }
            }
        }
    })
    }

    {buttons()}
    return (
        <>
        <div className="commentBox">
           {userComments()}
        </div>
        </>
    )
}

export default Comments
