
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {deleteComment, editOneComment } from '../../store/commentSession';

const EditComment = ({comment, hideForm})=>{
    let history = useHistory( );
    const dispatch = useDispatch()
    let commie = comment

    const sessionComments = useSelector(state=>state.comment)
    const [showEditComment, setShowEditComment] = useState(false);
    const [editComment, setEditComment] = useState('');

    const comments = []
    for (const comment in sessionComments){
        comments.push(sessionComments[comment])
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log(comment)
        let updatedComment = {
            ... commie,
            comment:editComment,
        }
        if(updatedComment){
            updatedComment = dispatch(editOneComment(updatedComment))
            hideForm();
            return updatedComment
        }
    }

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
    }
    let deletethisComment = async()=>{
        await dispatch(deleteComment(commie.id))
    }

    return (

            <form id="editCommentForm" onSubmit={handleSubmit}>
                <input className="editCommentInput"
                    required
                    value={editComment}
                    placeholder={'Edit Comment'}
                    onChange={(e)=>setEditComment(e.target.value)}
                    />
                <button type="submit" >Update Comment</button>
                <button type="reset" onClick={handleCancelClick}>Cancel</button>
            </form>

    )
}

export default EditComment;
