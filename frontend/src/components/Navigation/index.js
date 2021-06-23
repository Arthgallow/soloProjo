import { NavLink } from "react-router-dom"
import { useDispatch , useSelector } from 'react-redux'
import { logout } from "../../store/session";
import ProfileButton from "./ProfileButton";
import './Navigation.css'
import logo from "../logo.png"



const Navigation = ({isLoaded}) => {
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
                    <NavLink className="navHome nav"  to={`/${sessionUser.id}`}>Home</NavLink>
                </p>
                <p>
                    <div>Groups</div>
                </p>
                <p>
                    <div>Goals</div>
                </p>
                <p>
                    <div>Search</div>
                </p>
            </div>
        )

        sessionLinksEnd = (
            <div className="navLinkBoxEnd">
                <p className="navBoxlogin">
                    <div></div>
                </p>
                <p className="navBoxSignup">
                    <ProfileButton user={sessionUser} />
                </p>
            </div>
        )
    } else {
        sessionLinksMiddle = (
            <div className="navLinkBoxMiddle">
                <p>
                    <NavLink className="navHome nav" exact to="/">Home</NavLink>
                </p>
                <p>
                    <div></div>
                </p>
                <p>
                    <div></div>
                </p>
                <p>
                    <div>Search</div>
                </p>
            </div>
        )
        sessionLinksEnd = (

            <div className="navLinkBoxEnd">
                <p className="navBoxlogin">
                    <NavLink className="loginNavLink nav" to='/login'>Welcom back loser</NavLink>
                </p>
                <p className="navBoxSignup">
                    <NavLink className="navSignup nav " to='/signup'>Join the dark side</NavLink>
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
