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

    if(sessionUser) return(
        <Redirect to="/" />
    )

    const handleSubmit = (e) =>{
        e.preventDefault();
        return dispatch(login({credential, password}))
            .catch (async (res)=>{
                const data = await res.json();
                if(data && data.errors) setErrors(data.errors)
            })


    }

    return (

       <div>
           <form onSubmit={handleSubmit}>
               <ul>
                   {errors.map((error, idx) => <li key={idx}>{error}</li>)}
               </ul>
               <div>
                   <label>
                        {`Email or UserName  `}
                   </label>
                   <input value={credential} onChange={(event)=>setCredential(event.target.value)}>
                   </input>
                </div>
                <div>
                   <label>
                      {"Password  "}
                   </label>
                   <input value={password} onChange={(event)=>setPassword(event.target.value)}>
                   </input>
                   <button type="submit">
                       Log In
                   </button>
               </div>
           </form>
       </div>
    )
}

export default LoginFormPage
