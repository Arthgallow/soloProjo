import { NavLink, Redirect } from "react-router-dom"
import { useDispatch , useSelector } from 'react-redux'
import { logout } from "../../store/session";
import ProfileButton from "./ProfileButton";
import './Navigation.css'
import logo from "../logo(2).png"



const Navigation = ({isLoaded}) => {
    let dispatch = useDispatch();
    const sessionUser = useSelector(state=>state.session.user);
    let sessionLinksMiddle;
    let sessionLinksEnd;
    let sessionLinkStart = (
        <>
            <img clsassName="logoImgNav" src={logo}/>
            <h1 className='logoNav'>Proof or False</h1>
        </>
    )

    if (sessionUser){
        sessionLinksMiddle= (
            <div className="navLinkBoxMiddle">

                <p>
                    <NavLink className="navGroup nav" to={`/groups`}>Groups</NavLink>
                </p>

                <p>
                    <input
                    placeholder="Search"
                    />
                </p>
            </div>
        )

        sessionLinksEnd = (
            <div className="navLinkBoxEnd">
                <p className="navBoxlogin">
                Welcom Back {sessionUser.username}!
                </p>
                <p className="navBoxSignup">
                    <NavLink className="navLogout nav" exact to="/groups">
                        <button type="submit" onClick={(e)=>{
                            // e.preventDefault();
                            dispatch(logout());
                            }}>LogOut</button>
                    </NavLink>


                </p >
            </div>
        )

    } else {
        sessionLinksMiddle = (
            <div className="navLinkBoxMiddle">
                   <p>
                    <NavLink className="navGroup nav" to={`/groups`}>Groups</NavLink>
                </p>

                <p>
                    <input
                    placeholder="Search"
                    />
                </p>
            </div>
        )
        sessionLinksEnd = (

            <div className="navLinkBoxEnd">
                <p className="navBoxlogin">
                    <NavLink className="loginNavLink nav" to='/login'>Log In</NavLink>
                </p>
                <p className="navBoxSignup">
                    <NavLink className="navSignup nav " to='/signup'>Join</NavLink>
                </p>
            </div>
        )
    }
        return isLoaded && (
            <nav className="bar">
                <div className="navBoxOne">
                    {sessionLinkStart}
                </div>
                <div className="navBoxTwo">
                {isLoaded && sessionLinksMiddle}
                </div>
                <div className="navBoxThree">

                {isLoaded && sessionLinksEnd}
                </div>

            </nav>
        )
}


export default Navigation;
