import React, { useState } from 'react'
import { useHistory, Switch, Route, Redirect } from 'react-router-dom'
import LoginView from '../views/authViews/LoginView'
import Guide1View from '../views/authViews/Guide1View'
import Guide2View from '../views/authViews/Guide2View'
import Guide3View from '../views/authViews/Guide3View'
import Guide4View from '../views/authViews/Guide4View'
import MainComponent from '../components/MainComponent'
import { proxyRouter } from "../utils/history"

function Router () {
  const [loggedIn, setLoggedIn] = useState(true)
  proxyRouter(useHistory(), 'login')

  return (
    <Switch>
      <Route exact path="/">
        {loggedIn ? <Redirect to="/main" /> : <LoginView />}
      </Route>
      <Route path="/main">
        <MainComponent />
      </Route>
      <Route path="/guide1">
        <Guide1View />
      </Route>
      <Route path="/guide2">
        <Guide2View />
      </Route>
      <Route path="/guide3">
        <Guide3View />
      </Route>
      <Route path="/guide4">
        <Guide4View />
      </Route>
      <Route path="/login">
        <LoginView />
      </Route>
      <Redirect to="/"/>
    </Switch>
  )
}

export default Router;
