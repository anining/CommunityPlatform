import React from 'react'
import { Layout } from 'antd'
import { Switch, Route, Redirect } from 'react-router-dom'
import HomeView from '../views/homeViews/HomeView'
import CardOrderView from '../views/orderRecordingViews/CardOrderView'
import CommunityOrderView from '../views/orderRecordingViews/CommunityOrderView'
import UserView from '../views/userViews/UserView'
import CapitalFlowView from '../views/capitalFlowViews/CapitalFlowView'
import GoodCategoryView from '../views/communityBusinessViews/GoodCategoryView'
import EditGoodCategoryView from '../views/communityBusinessViews/EditGoodCategoryView'
import CommunityGoodView from '../views/communityBusinessViews/CommunityGoodView'
import EditCommunityGoodView from '../views/communityBusinessViews/EditCommunityGoodView'
import OrderModelView from '../views/communityBusinessViews/OrderModelView'
import EditOrderModelView from '../views/communityBusinessViews/EditOrderModelView'

function ContentComponent () {

  return (
    <Layout.Content style={{
      marginLeft:24,
      marginRight:24,
      marginBottom:24,
      marginTop:84
    }}>
      <Switch>
        <Route path="/main/home">
          <HomeView />
        </Route>
        <Route exact path="/main/goodCategory">
          <GoodCategoryView />
        </Route>
        <Route exact path="/main/editGoodCategory">
          <EditGoodCategoryView />
        </Route>
        <Route exact path="/main/communityGood">
          <CommunityGoodView />
        </Route>
        <Route exact path="/main/editCommunityGood">
          <EditCommunityGoodView />
        </Route>
        <Route exact path="/main/orderModel">
          <OrderModelView />
        </Route>
        <Route exact path="/main/editOrderModel">
          <EditOrderModelView />
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
