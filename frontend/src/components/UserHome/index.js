import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import "./UserHome.css"
import logo from"../logo.png"



const UserHome = () => {
    const sessionUser = useSelector(state=>state.session.user);
    if(!sessionUser){
        return(
            <Redirect exact to="/" />
            )
    }

    return (
        <>
                   <div className="logoBox">
        <h1>
            tis only but a scratch
        </h1>

        <img src={logo} />

    </div>
        </>
    )
}

export default UserHome;
