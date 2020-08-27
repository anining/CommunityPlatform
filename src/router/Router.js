import React, { useState } from 'react'
import { useHistory, Switch, Route, Redirect } from 'react-router-dom'
import LoginView from '../views/authViews/LoginView'
import MainComponent from '../components/MainComponent'
import { proxyRouter } from "../utils/history"

function Router () {
  const [loggedIn, setLoggedIn] = useState(false)
  proxyRouter(useHistory(), 'login')

  return (
    <Switch>
      <Route exact path="/">
        {loggedIn ? <Redirect to="/main" /> : <LoginView />}
      </Route>
      <Route path="/main">
        <MainComponent />
      </Route>
      <Route path="/login">
        <LoginView />
      </Route>
      <Redirect to="/"/>
    </Switch>
  )
}

export default Router;
