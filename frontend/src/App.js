import React, {useState, useEffect} from "react";
import { useDispatch} from "react-redux";
import { Switch, Route } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage"
import Navigation from "./components/Navigation";
import SplashPage from "./components/SplashPage";
import UserHome from "./components/UserHome";
import * as sessionActions from "./store/session";
import './background.css'

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(()=>{
    dispatch(sessionActions.restoreUser()).then(()=>setIsLoaded(true))
  },[dispatch])



  return  isLoaded && (
    <>
    <Navigation isLoaded={isLoaded} />
    <Switch>
      <div className="bg o">
      <Route path="/login">
        <LoginFormPage />
      </Route>
      <Route path="/signup">
         <SignupFormPage />
      </Route>
      <Route exact path="/">
        <SplashPage />
      </Route>
      </div>
      <Route>
        <UserHome exact path="/:userId" />
      </Route>
    </Switch>
    </>
  );
}

export default App;
