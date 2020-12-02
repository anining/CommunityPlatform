import React, {useEffect} from "react";
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
import SelectTableView from "../views/tableViews/SelectTableView"
import {push} from "../utils/util";
import {linkClient} from "../utils/customizeFetch";
import SelectGoodCategoryView from '../views/communityBusinessViews/SelectGoodCategoryView'

function Router () {
	linkClient();
  proxyRouter(useHistory(), '/login')
  const { authorization, old_password, nickname, permissions, role } = getter(['old_password', 'nickname', 'authorization', 'role', 'permissions'])
  const localAuthorization = storage.getItem("authorization")
  const localPermissions = storage.getItem("permissions")
  const localRole = storage.getItem("role")
  const localNickname = storage.getItem("nickname");
  const local_old_password = storage.getItem("old_password");
  !authorization.get() && localAuthorization && setter([["authorization", localAuthorization.replace(/\"/g, "")]]);
  !permissions.get().length && localPermissions && setter([["permissions", JSON.parse(localPermissions)]]);
  !role.get() && localRole && setter([["role", localRole.replace(/\"/g, "")]]);
  !nickname.get() && localNickname && setter([["nickname", localNickname.replace(/\"/g, "")]]);
  !old_password.get() && local_old_password && setter([["old_password", local_old_password.replace(/\"/g, "")]])

  useEffect(() => {
    const timer = setInterval(() => !storage.getItem("authorization") && push('/login'), 1000)
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
      <Route exact path="/select-goods-category">
        <SelectGoodCategoryView />
      </Route>
      <Route path="/login">
        <LoginView />
      </Route>
      <Redirect to="/"/>
    </Switch>
  )
}

export default Router;
