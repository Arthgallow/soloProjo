import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getComments, makeComment, getOneComment } from "../../store/commentSession";


const NewComment = ({group}) =>{
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state=>state.session.user)


    const [newComment, setNewComment] = useState('')

    useEffect(()=>{
        dispatch(getComments())
    },[dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();

        let addedComment = {
            userId: sessionUser.id ,
            goalId: 0,
            groupId:group.id,
            mediaId:0,
            comment:newComment,
        }
        if(addedComment){
            addedComment = await dispatch(makeComment(addedComment))
        }
    }


    return(
        <>
            <form onSubmit={handleSubmit}>
                <input className="newCommentInputBox"
                placeholder="Add A New Comment"
                required
                value={newComment}
                onChange={(e)=>setNewComment(e.target.value)}
                />
                <button type="submit">Comment</button>
            </form>
        </>
    )
}

export default NewComment;
