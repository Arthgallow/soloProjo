import React,{useState} from 'react'
import { useDispatch , useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signup } from '../../store/session'

const SignupFormPage = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state=>state.session.user);
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])

    if(sessionUser) return (
        <Redirect to ="/" />
    )

    const handleSubmit = (e) => {
        e.preventDefault();
        if(password === confirmPassword){
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
        <form onSubmit={handleSubmit} >
            <ul>
                {errors.map((error, idx)=> <li key={idx}>{error}</li>)}
            </ul>
            <div>
                <label>
                    Pick a name
                </label>
                <input type="text" value={username} onChange={(event)=>setUserName(event.target.value)}>
                </input>
            </div>
            <div>
                <label>
                    What is your Email?
                </label>
                <input type="text" value={email} onChange={(event)=>setEmail(event.target.value)} >
                </input>
            </div>
            <div>
                <label>
                    Password?
                </label>
                <input type="password" value={password} onChange={(event)=>setPassword(event.target.value)} >
                </input>
            </div>
            <div>
                <label>
                    Confirm Your Password?
                </label>
                <input type="password" value={confirmPassword} onChange={(event)=>setConfirmPassword(event.target.value)} >
                </input>
            </div>
            <div>
                <button type="submit" > Sell me your soul... </button>
            </div>
        </form>

    )



}

export default SignupFormPage;
