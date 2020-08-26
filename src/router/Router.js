import React, { useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import LoginView from '../views/authViews/LoginView'
import MainComponent from '../components/MainComponent'

function Router () {
  const [loggedIn, setLoggedIn] = useState(true)

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/main" /> : <LoginView />}
        </Route>
        <Route path="/main">
          <MainComponent />
        </Route>
        <Redirect to="/main"/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router;
