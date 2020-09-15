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
import EditChildWebView from '../views/childWebViews/EditChildWebView'
import ChildWebSettingView from '../views/childWebViews/ChildWebSettingView'
import StoreSettingView from '../views/childWebViews/StoreSettingView'
import CardGoodView from '../views/cardBusinessViews/CardGoodView'
import EditCardGoodView from '../views/cardBusinessViews/EditCardGoodView'
import CardManageView from '../views/cardBusinessViews/CardManageView'
import EditCardManageView from '../views/cardBusinessViews/EditCardManageView'
import CardCategoryView from '../views/cardBusinessViews/CardCategoryView'
import EditCardCategoryView from '../views/cardBusinessViews/EditCardCategoryView'
import EditUserPriceView from '../views/userViews/EditUserPriceView'
import AddUserView from '../views/userViews/AddUserView'
import DockingView from '../views/servicesViews/DockingView'
import EditDockingView from '../views/servicesViews/EditDockingView'
import StoreView from '../views/servicesViews/StoreView'
import EditStoreView from '../views/servicesViews/EditStoreView'
import SubServiceView from '../views/servicesViews/SubServiceView'
import MoneyRebotView from "../views/webSettingViews/MoneyRebotView"
import ImagesView from "../views/webSettingViews/ImagesView"
import PeopleServiceView from "../views/webSettingViews/PeopleServiceView"
import NoticeView from "../views/webSettingViews/NoticeView"
import AddNoticeView from "../views/webSettingViews/AddNoticeView"
import AdminView from "../views/webSettingViews/AdminView"
import AddAdminView from "../views/webSettingViews/AddAdminView"
import PassWordView from "../views/webSettingViews/PassWordView"
import LoggerView from "../views/webSettingViews/LoggerView"
import AboutView from "../views/webSettingViews/AboutView"
import BusinessSettingView from "../views/webSettingViews/BusinessSettingView"
import DataSettingView from "../views/webSettingViews/DataSettingView"
import DataStatisticsView from "../views/statisticsViews/DataStatisticsView"
import MoneyStatisticsView from "../views/statisticsViews/MoneyStatisticsView"
import UserStatisticsView from "../views/statisticsViews/UserStatisticsView"
import WebStatisticsView from "../views/statisticsViews/WebStatisticsView"
import GoodStatisticsView from "../views/statisticsViews/GoodStatisticsView"
import TableView from "../views/tableViews/TableView"
import SelectTableView from "../views/tableViews/SelectTableView"

function ContentComponent () {

  return (
    <Layout.Content style={{
      marginLeft:24,
      marginRight:24,
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
        <Route exact path="/main/editChildWeb">
          <EditChildWebView />
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
        <Route exact path="/main/editDocking">
          <EditDockingView />
        </Route>
        <Route exact path="/main/store">
          <StoreView />
        </Route>
        <Route exact path="/main/storeSetting">
          <StoreSettingView />
        </Route>
        <Route exact path="/main/rebot">
          <MoneyRebotView />
        </Route>
        <Route exact path="/main/images">
          <ImagesView />
        </Route>
        <Route exact path="/main/table">
          <TableView />
        </Route>
        <Route exact path="/main/select-table">
          <SelectTableView />
        </Route>
        <Route exact path="/main/peopleService">
          <PeopleServiceView />
        </Route>
        <Route exact path="/main/notice">
          <NoticeView />
        </Route>
        <Route exact path="/main/addNotice">
          <AddNoticeView />
        </Route>
        <Route exact path="/main/admin">
          <AdminView />
        </Route>
        <Route exact path="/main/addAdmin">
          <AddAdminView />
        </Route>
        <Route exact path="/main/password">
          <PassWordView />
        </Route>
        <Route exact path="/main/logger">
          <LoggerView />
        </Route>
        <Route exact path="/main/about">
          <AboutView />
        </Route>
        <Route exact path="/main/businessSetting">
          <BusinessSettingView />
        </Route>
        <Route exact path="/main/dataSetting">
          <DataSettingView />
        </Route>
        <Route exact path="/main/editStore">
          <EditStoreView />
        </Route>
        <Route exact path="/main/dataStatistics">
          <DataStatisticsView />
        </Route>
        <Route exact path="/main/goodStatistics">
          <GoodStatisticsView />
        </Route>
        <Route exact path="/main/moneyStatistics">
          <MoneyStatisticsView />
        </Route>
        <Route exact path="/main/userStatistics">
          <UserStatisticsView />
        </Route>
        <Route exact path="/main/webStatistics">
          <WebStatisticsView />
        </Route>
        <Route exact path="/main/subService">
          <SubServiceView />
        </Route>
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
        <Redirect to="/main/home" />
      </Switch>
    </Layout.Content>
  )
}

export default ContentComponent
