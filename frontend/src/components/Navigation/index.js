import { NavLink } from "react-router-dom"
import { useDispatch , useSelector } from 'react-redux'
import { logout } from "../../store/session";
import ProfileButton from "./ProfileButton";



const Navigation = ({isLoaded}) => {
    const sessionUser = useSelector(state=>state.session.user);
    let sessionLinks;
    if (sessionUser){
        sessionLinks = ( <ProfileButton user={sessionUser}/>)
    } else {
        sessionLinks = (
            <>
                <NavLink  to='/login'>Welcom back loser</NavLink>
                <NavLink to='/signup'>Join the dark side</NavLink>
            </>
        )
    }
        return isLoaded && (
            <ul>
                <li>
                <NavLink exact to="/">Home</NavLink>
                {isLoaded && sessionLinks}
                </li>
            </ul>
        )
}


export default Navigation;
