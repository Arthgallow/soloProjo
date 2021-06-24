import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import './UserHome.css'



const UserHome = () => {
    const sessionUser = useSelector(state=>state.session.user);

    if(!sessionUser){
        return(
            <Redirect exact to="/" />
            )
    }

    return (
        <>
         <div id="userPageBox">


        <h1>
            tis only but a scratch
        </h1>

         </div>


        </>
    )
}

export default UserHome;
