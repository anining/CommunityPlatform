import React from 'react'
import { Layout } from 'antd'
import { Switch, Route, Redirect } from 'react-router-dom'
import HomeView from '../views/homeViews/HomeView'
import CardOrderView from '../views/orderRecordingViews/CardOrderView'
import CommunityOrderView from '../views/orderRecordingViews/CommunityOrderView'
import UserView from '../views/userViews/UserView'
import CapitalFlowView from '../views/capitalFlowViews/CapitalFlowView'

function ContentComponent () {

  return (
    <Layout.Content style={{margin:24}}>
      <Switch>
        <Route path="/main/home">
          <HomeView />
        </Route>
        {/* <Route exact path="/main/statistics"> */}
        {/*   <StatisticsView /> */}
        {/* </Route> */}
        {/* <Route exact path="/main/communityBusiness"> */}
        {/*   <CommunityBusinessView /> */}
        {/* </Route> */}
        {/* <Route exact path="/main/cardBusiness"> */}
        {/*   <CardBusinessView /> */}
        {/* </Route> */}
        {/* <Route exact path="/main/services"> */}
        {/*   <ServicesView /> */}
        {/* </Route> */}
        {/* <Route exact path="/main/communityOrder"> */}
        {/*   <CommunityOrderView /> */}
        {/* </Route> */}
        {/* <Route path="/main/cardOrder"> */}
        {/*   <CardOrderView /> */}
        {/* </Route> */}
        {/* <Route path="/main/capitalFlow"> */}
        {/*   <CapitalFlowView /> */}
        {/* </Route> */}
        {/* <Route path="/main/user"> */}
        {/*   <UserView /> */}
        {/* </Route> */}
        {/* <Route path="/main/webSetting"> */}
        {/*   <WebSettingView /> */}
        {/* </Route> */}
        {/* <Route path="/main/systemSetting"> */}
        {/*   <SystemSetting /> */}
        {/* </Route> */}
        <Redirect to="/main/home" />
      </Switch>
    </Layout.Content>
  )
}

export default ContentComponent
