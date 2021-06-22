import React,{useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signup } from '../../store/session'
import "./SignupFormPage.css"

const SignupFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state.session.user);
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])

    const stopBackground = () => {
       let background = document.querySelector(".bg").classList.remove("bg");
       return background
    }

    if(sessionUser){
        document.querySelector(".bg").classList.remove("bg");
        return  (
        <Redirect to ="/" />
    )
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(password === confirmPassword && password){
            setErrors([]);
            return dispatch(signup({email, username, password}))
            .catch(async (res)=> {
                const data = await res.json();
                if(data && data.errors) setErrors(data.errors)
            })
        }
        return setErrors(["Tricky, Tricky, match them passwords..."])

    }

    return (
        <div className="signupFormBoard">
            <div className="signupFormBackground">
                <form id="signupForm" onSubmit={handleSubmit}  >
                    <div>
                        <div className="signupFormErrorBox">
                            <ul>
                                {errors.map((error, idx)=> <li key={idx}>{error}</li>)}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div className="signupFormLabelBox">
                            <label>
                                {"Pick a name   "}
                            </label>
                        </div>
                        <div className="loginFormInputBox">
                            <input type="text" value={username} onChange={(event)=>setUserName(event.target.value)}>
                            </input>
                        </div>
                    </div>
                    <div>
                        <div className="signupFormLabelBox">
                            <label>
                                {"What is your Email?   "}
                            </label>
                        </div>
                        <div className="loginFormInputBox">
                            <input type="text" value={email} onChange={(event)=>setEmail(event.target.value)} >
                            </input>
                        </div>
                    </div>
                    <div>
                        <div className="signupFormLabelBox">
                            <label>
                                {"Password?   "}
                            </label>
                        </div>
                        <div className="signupFormInputBox">
                            <input type="password" value={password} onChange={(event)=>setPassword(event.target.value)} >
                            </input>
                        </div>
                    </div>
                    <div>
                        <div className="signupFormLabelBox">
                            <label>
                                {"Are you sure...   "}
                            </label>
                        </div>
                        <div className="signupFormInputBox">
                            <input type="password" value={confirmPassword} onChange={(event)=>setConfirmPassword(event.target.value)} >
                            </input>
                        </div>
                    </div>
                    <div>
                        <div className="signupFormButton">
                            <button className="btn" type="submit" > Sell me your soul... </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )



}

export default SignupFormPage;
