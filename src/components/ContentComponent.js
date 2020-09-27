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
import OrderView from "../views/orderRecordingViews/OrderView"
import AddPeopleServiceView from "../views/webSettingViews/AddPeopleServiceView"
import { getter } from "../utils/store"
import ErrorView from "../views/systemSettingViews/ErrorView"

function ContentComponent () {
  const { permissions, role } = getter(['permissions', 'role']);
  const localPermissions = permissions.get() || []

  return (
    <Layout.Content style={{
      marginLeft:224,
      marginRight:24,
      marginBottom:24,
      marginTop:84
    }}>
      <Switch>
        <Route path="/main/home">
          <HomeView />
        </Route>
        <Route path="/main/error">
          <ErrorView />
        </Route>
        {/* 社区业务 */}
        <Route exact path="/main/goodCategory">
          { localPermissions.includes('commbiz') ? <GoodCategoryView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/editGoodCategory">
          { localPermissions.includes('commbiz') ? <EditGoodCategoryView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/communityGood">
          { localPermissions.includes('commbiz') ? <CommunityGoodView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/editCommunityGood">
          { localPermissions.includes('commbiz') ? <EditCommunityGoodView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/orderModel">
          { localPermissions.includes('commbiz') ? <OrderModelView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/editOrderModel">
          { localPermissions.includes('commbiz') ? <EditOrderModelView /> : <Redirect to="/main/error" /> }
        </Route>
        {/* 分站管理 */}
        <Route exact path="/main/childWebList">
          { localPermissions.includes('subcitemng') ? <ChildWebListView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/editChildWebList">
          { localPermissions.includes('subcitemng') ? <EditChildWebView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/childWebSetting">
          { localPermissions.includes('subcitemng') ? <ChildWebSettingView /> : <Redirect to="/main/error" /> }
        </Route>
        {/* 卡密业务 */}
        <Route exact path="/main/cardGood">
          { localPermissions.includes('cardbiz') ? <CardGoodView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/editCardGood">
          { localPermissions.includes('cardbiz') ? <EditCardGoodView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/cardManage">
          { localPermissions.includes('cardbiz') ? <CardManageView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/editCardManage">
          { localPermissions.includes('cardbiz') ? <EditCardManageView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/cardCategory">
          { localPermissions.includes('cardbiz') ? <CardCategoryView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/editCardCategory">
          { localPermissions.includes('cardbiz') ? <EditCardCategoryView /> : <Redirect to="/main/error" /> }
        </Route>
        {/* 订单记录 */}
        <Route exact path="/main/order">
          { localPermissions.includes('orderlog') ? <OrderView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/communityOrder">
          { localPermissions.includes('orderlog') ? <CommunityOrderView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route path="/main/cardOrder">
          { localPermissions.includes('orderlog') ? <CardOrderView /> : <Redirect to="/main/error" /> }
        </Route>
        {/* 增值服务 */}
        <Route exact path="/main/subService">
          { localPermissions.includes('valueaddedsrv') ? <SubServiceView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/editStore">
          { localPermissions.includes('valueaddedsrv') ? <EditStoreView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/docking">
          { localPermissions.includes('valueaddedsrv') ? <DockingView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/editDocking">
          { localPermissions.includes('valueaddedsrv') ? <EditDockingView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/store">
          { localPermissions.includes('valueaddedsrv') ? <StoreView /> : <Redirect to="/main/error" /> }
        </Route>
        {/* 站点管理 */}
        <Route exact path="/main/storeSetting">
          { localPermissions.includes('citecfg') ? <StoreSettingView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/rebot">
          { localPermissions.includes('citecfg') ? <MoneyRebotView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/images">
          { localPermissions.includes('citecfg') ? <ImagesView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/peopleService">
          { localPermissions.includes('citecfg') ? <PeopleServiceView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/addPeopleService">
          { localPermissions.includes('citecfg') ? <AddPeopleServiceView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/notice">
          { localPermissions.includes('citecfg') ? <NoticeView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/addNotice">
          { localPermissions.includes('citecfg') ? <AddNoticeView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/admin">
          { role.get() === 'superuser' ? <AdminView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/addAdmin">
          { localPermissions.includes('citecfg') ? <AddAdminView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/password">
          { localPermissions.includes('citecfg') ? <PassWordView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/logger">
          { localPermissions.includes('citecfg') ? <LoggerView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/about">
          { localPermissions.includes('citecfg') ? <AboutView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/businessSetting">
          { localPermissions.includes('citecfg') ? <BusinessSettingView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/dataSetting">
          { localPermissions.includes('citecfg') ? <DataSettingView /> : <Redirect to="/main/error" /> }
        </Route>
        {/* 标签管理 */}
        <Route exact path="/main/table">
          { localPermissions.includes('tagmng') ? <TableView /> : <Redirect to="/main/error" /> }
        </Route>
        {/* 数据统计 */}
        <Route exact path="/main/dataStatistics">
          { localPermissions.includes('statistics') ? <DataStatisticsView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/goodStatistics">
          { localPermissions.includes('statistics') ? <GoodStatisticsView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/moneyStatistics">
          { localPermissions.includes('statistics') ? <MoneyStatisticsView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/userStatistics">
          { localPermissions.includes('statistics') ? <UserStatisticsView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route exact path="/main/webStatistics">
          { localPermissions.includes('statistics') ? <WebStatisticsView /> : <Redirect to="/main/error" /> }
        </Route>
        {/* 资金流水 */}
        <Route path="/main/capitalFlow">
          { localPermissions.includes('capitalflow') ? <CapitalFlowView /> : <Redirect to="/main/error" /> }
        </Route>
        {/* 用户管理 */}
        <Route path="/main/user">
          { localPermissions.includes('usermng') ? <UserView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route path="/main/addUser">
          { localPermissions.includes('usermng') ? <AddUserView /> : <Redirect to="/main/error" /> }
        </Route>
        <Route path="/main/editUserPrice">
          { localPermissions.includes('usermng') ? <EditUserPriceView /> : <Redirect to="/main/error" /> }
        </Route>
        <Redirect to="/main/home" />
      </Switch>
    </Layout.Content>
  )
}

export default ContentComponent
