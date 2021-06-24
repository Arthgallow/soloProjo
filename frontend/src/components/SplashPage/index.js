import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react';
import './SplashPage.css'
import logo from "../logo(2).png"



const SplashPage = () => {
    const sessionUser = useSelector(state=>state.session.user)
    if(sessionUser){
        return(
            <Redirect to={`/${sessionUser.id}`} />
        );
    } else {
        return (
            <div className="logoBox">
                <div className="logoBoardBackground">
                    <div className="logoBoard">
                        {/* <div className="nameBox">
                            <h1> Proof or False</h1>
                            </div>
                            <div className="tagLineBox">
                            <h2>Accountability for Buddies</h2>
                        </div> */}
                        {/* <img className='logo' src={logo} /> */}
                    </div>
                </div>
            </div>

);

}
}

export default SplashPage
