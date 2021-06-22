import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session'
import './LoginForm.css'

const LoginFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state.session.user)
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if(sessionUser){

        return(
            <Redirect to="/" />
            )
        }

        const handleSubmit = (e) =>{
            e.preventDefault();
            document.querySelector(".bg").classList.remove("bg")
        return dispatch(login({credential, password}))
            .catch (async (res)=>{
                const data = await res.json();
                if(data && data.errors) setErrors(data.errors)
            })


    }

    return (

       <div className="loginFormBoard">
           <div className="loginFormBackground">
                <form id="loginForm" onSubmit={handleSubmit}>
                    <div>
                        <div className="loginFormErrorBox">
                            <ul>
                                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div className="loginFormLabelBox">
                            <label>
                                {`Email or UserName  `}
                            </label>
                        </div>
                        <div className="loginFormInputBox">
                            <input value={credential} onChange={(event)=>setCredential(event.target.value)}>
                            </input>
                        </div>
                    </div>
                    <div>
                        <div className="loginFormLabelBox">
                            <label>
                                {"Password  "}
                            </label>
                        </div>
                        <div className="loginFormInputBox">
                            <input type="password" value={password} onChange={(event)=>setPassword(event.target.value)}>
                            </input>
                        </div>
                    </div>
                    <div>
                        <div className="loginFormButton">
                            <button className="btn" type="submit">
                                Log In
                            </button>
                        </div>
                    </div>
                </form>
           </div>
       </div>
    )
}

export default LoginFormPage
