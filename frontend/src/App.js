import React, {useState, useEffect} from "react";
import { useDispatch} from "react-redux";
import { Switch, Route } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage"
import Navigation from "./components/Navigation";
import Groups from "./components/Groups";
import SplashPage from "./components/SplashPage";
import GroupId from "./components/GroupId";
import NewComment from "./components/NewComment";
import Comments from "./components/Comments";
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
    <div  id="splachBackground" className="bg o">
    <Switch>
      <Route exact path="/login">
        <LoginFormPage />
      </Route>
      <Route  exact path="/signup">
        <SignupFormPage  />
      </Route>
      <Route exact path="/">
        <SplashPage  />
      </Route>
      <Route exact path="/groups" >
        <Groups  />
      </Route>
      <Route exact path="/groups/:groupId">
        <GroupId />
      </Route>

      <Route >
        Sorry Charlie, Tis Not for Doin...
      </Route>

    </Switch>
      </div>

    </>
  );
}

export default App;
