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
import SelectTableView from "../views/tableViews/SelectTableView"
import SelectGoodCategoryView from "../views/communityBusinessViews/SelectGoodCategoryView"
import SelectOrderModelView from "../views/communityBusinessViews/SelectOrderModelView"

function Router () {
  proxyRouter(useHistory(), '/login')
  const localAuthorization = storage.getItem("authorization")
  const localPermissions = storage.getItem("permissions")
  const localRole = storage.getItem("role")
  const { authorization, permissions, role } = getter(['authorization', 'role', 'permissions']);
  const history = h.get();
  !authorization.get() && localAuthorization && setter([["authorization", localAuthorization.replace(/\"/g, "")]]);
  !permissions.get().length && localPermissions && setter([["permissions", JSON.parse(localPermissions)]]);
  !role.get() && localRole && setter([["role", localRole.replace(/\"/g, "")]])

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
      <Route exact path="/select-table">
        <SelectTableView />
      </Route>
      <Route exact path="/select-good-category">
        <SelectGoodCategoryView />
      </Route>
      <Route exact path="/select-order-model">
        <SelectOrderModelView />
      </Route>
      <Route path="/login">
        <LoginView />
      </Route>
      <Redirect to="/"/>
    </Switch>
  )
}

export default Router;
