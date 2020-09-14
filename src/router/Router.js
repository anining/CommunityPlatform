import React, { useEffect } from 'react'
import { useHistory, Switch, Route, Redirect } from 'react-router-dom'
import LoginView from '../views/authViews/LoginView'
import Guide1View from '../views/authViews/Guide1View'
import Guide2View from '../views/authViews/Guide2View'
import Guide3View from '../views/authViews/Guide3View'
import Guide4View from '../views/authViews/Guide4View'
import MainComponent from '../components/MainComponent'
import { proxyRouter } from "../utils/history"
import { storage } from '../utils/storage'
import { setter, getter } from '../utils/store'
import { h } from '../utils/history'

function Router () {
  proxyRouter(useHistory(), '/login')
  const localAuthorization = storage.getItem("authorization")
  const { authorization } = getter(['authorization']);
  const history = h.get();
  !authorization.get() && localAuthorization && setter([["authorization", localAuthorization.replace(/\"/g, "")]])

  useEffect(() => {
    const timer = setInterval(() => {
      const authorization = storage.getItem("authorization");
      !authorization && history.push('/login')
    }, 1000);
    return () => timer && clearInterval(timer)
  }, [])

  return (
    <Switch>
      <Route exact path="/">
        {authorization.get() ? <Redirect to="/main/home" /> : <LoginView />}
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
