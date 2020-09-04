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
import ChildWebListView from '../views/childWebViews/ChildWebListView'
import ChildWebSettingView from '../views/childWebViews/ChildWebSettingView'
import CardGoodView from '../views/cardBusinessViews/CardGoodView'
import EditCardGoodView from '../views/cardBusinessViews/EditCardGoodView'
import CardManageView from '../views/cardBusinessViews/CardManageView'
import EditCardManageView from '../views/cardBusinessViews/EditCardManageView'
import CardCategoryView from '../views/cardBusinessViews/CardCategoryView'
import EditCardCategoryView from '../views/cardBusinessViews/EditCardCategoryView'
import EditUserPriceView from '../views/userViews/EditUserPriceView'
import AddUserView from '../views/userViews/AddUserView'
import DockingView from '../views/servicesViews/DockingView'
import StoreView from '../views/servicesViews/StoreView'

function ContentComponent () {

  return (
    <Layout.Content style={{
      marginLeft:24,
      marginRight:24,
      marginBottom:24,
      marginTop:84,
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
        <Route exact path="/main/childWebList">
          <ChildWebListView />
        </Route>
        <Route exact path="/main/childWebSetting">
          <ChildWebSettingView />
        </Route>
        <Route exact path="/main/cardGood">
          <CardGoodView />
        </Route>
        <Route exact path="/main/editCardGood">
          <EditCardGoodView />
        </Route>
        <Route exact path="/main/cardManage">
          <CardManageView />
        </Route>
        <Route exact path="/main/editCardManage">
          <EditCardManageView />
        </Route>
        <Route exact path="/main/cardCategory">
          <CardCategoryView />
        </Route>
        <Route exact path="/main/editCardCategory">
          <EditCardCategoryView />
        </Route>
        <Route exact path="/main/docking">
          <DockingView />
        </Route>
        <Route exact path="/main/store">
          <StoreView />
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
        <Route exact path="/main/communityOrder">
          <CommunityOrderView />
        </Route>
        <Route path="/main/cardOrder">
          <CardOrderView />
        </Route>
        <Route path="/main/capitalFlow">
          <CapitalFlowView />
        </Route>
        <Route path="/main/user">
          <UserView />
        </Route>
        <Route path="/main/addUser">
          <AddUserView />
        </Route>
        <Route path="/main/editUserPrice">
          <EditUserPriceView />
        </Route>
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
