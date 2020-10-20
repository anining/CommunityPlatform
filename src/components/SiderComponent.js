import * as React from 'karet'
import * as U from 'karet.util'
import * as R from 'kefir.ramda'
import { useEffect } from 'react'
import { Layout, Menu } from 'antd'
import c from '../styles/header.module.css'
import sider1 from '../icons/sider/sider1.png'
import sider2 from '../icons/sider/sider2.png'
import sider3 from '../icons/sider/sider3.png'
import sider4 from '../icons/sider/sider4.png'
import sider5 from '../icons/sider/sider5.png'
import sider6 from '../icons/sider/sider6.png'
import sider7 from '../icons/sider/sider7.png'
import sider8 from '../icons/sider/sider8.png'
import sider9 from '../icons/sider/sider9.png'
import sider10 from '../icons/sider/sider10.png'
import sider11 from '../icons/sider/sider11.png'
import sider12 from '../icons/sider/sider12.png'
import sider13 from '../icons/sider/sider13.png'
import sider14 from '../icons/sider/sider14.png'
import sider15 from '../icons/sider/sider15.png'
import sider16 from '../icons/sider/sider16.png'
import sider17 from '../icons/sider/sider17.png'
import sider18 from '../icons/sider/sider18.png'
import sider19 from '../icons/sider/sider19.png'
import sider20 from '../icons/sider/sider20.png'
import sider21 from '../icons/sider/sider21.png'
import sider22 from '../icons/sider/sider22.png'
import sider23 from '../icons/sider/sider23.png'
import sider24 from '../icons/sider/sider24.png'
import { getter, setter } from "../utils/store"
import { push } from "../utils/util"

function SiderComponent ({ collapsed, toggle }) {
  const { role, openKeys, selectedKeys, permissions } = getter(["permissions", "selectedKeys", "openKeys", "role"])

  useEffect(() => {
    const { pathname } = window.location
    const arr = pathname.split('/')
    arr.length && setter([["selectedKeys", arr[arr.length - 1]]]);
  }, [])

  function menuItemClick ({ item, key, keyPath, domEvent }) {
    if (["home", "table", "capitalFlow", "user"].includes(key)) {
      setter([["openKeys", []]])
    }
    setter([["selectedKeys", keyPath]])
    push(`/main/${key}`)
  }

  function onTitleClick ({ key, domEvent }) {
    const localOpenKeys = openKeys.get()
    if (localOpenKeys.length && localOpenKeys.includes(key)) {
      setter([["openKeys", []]])
    } else {
      setter([["openKeys", [key]]])
    }
  }

  function MyMenu ({ role, permissions }) {
    if (R.isNil(role) || R.isNil(permissions)) {
      return null
    }

    return (
      <Menu karet-lift theme="light" mode="inline" openKeys={U.template(openKeys)} selectedKeys={U.template(selectedKeys)} onClick={menuItemClick} multiple={false}>
        {/* <Menu.Item key="home" icon={<Icon keys="home" />}> */}
        {/*   用户首页 */}
        {/* </Menu.Item> */}
        {/* { U.when(R.includes('statistics',permissions), ( */}
        {/*   <Menu.SubMenu onTitleClick={onTitleClick} key="statistics" icon={<Icon keys="statistics" />} title="数据统计"> */}
        {/*     <Menu.Item key="dataStatistics">数据统计</Menu.Item> */}
        {/*     <Menu.Item key="moneyStatistics">资金统计</Menu.Item> */}
        {/*     <Menu.Item key="userStatistics">用户统计</Menu.Item> */}
        {/*     <Menu.Item key="webStatistics">网站访问统计</Menu.Item> */}
        {/*     <Menu.Item key="goodStatistics">商品订单统计</Menu.Item> */}
        {/*   </Menu.SubMenu> */}
        {/* )) } */}
        { U.when(R.includes('commbiz',permissions), (
            <Menu.SubMenu onTitleClick={onTitleClick} key="communityBusiness" icon={<Icon keys="communityBusiness" />} title="社区业务">
              <Menu.Item key="communityGood">社区商品</Menu.Item>
              <Menu.Item key="goodCategory">商品分类</Menu.Item>
              <Menu.Item key="orderModel">下单模型</Menu.Item>
              <Menu.Item key="markupTem">加价模版</Menu.Item>
            </Menu.SubMenu>
        )) }
        { U.when(R.includes('cardbiz',permissions), (
            <Menu.SubMenu onTitleClick={onTitleClick} key="cardBusiness" icon={<Icon keys="cardBusiness" />} title="卡密业务">
              <Menu.Item key="cardGood">卡密商品</Menu.Item>
              <Menu.Item key="cardManage">卡密管理</Menu.Item>
              <Menu.Item key="cardCategory">卡密分类</Menu.Item>
            </Menu.SubMenu>
        )) }
        { U.when(R.includes('valueaddedsrv',permissions), (
            <Menu.SubMenu onTitleClick={onTitleClick} key="services" icon={<Icon keys="services" />} title="增值服务">
              <Menu.Item key="docking">对接</Menu.Item>
              <Menu.Item key="store">供货商</Menu.Item>
              <Menu.Item key="subService">开通服务</Menu.Item>
            </Menu.SubMenu>
        )) }
        { U.when(R.includes('tagmng', permissions), (
            <Menu.Item key="table" icon={<Icon keys="table" />}>
              标签管理
            </Menu.Item>
        )) }
        { U.when(R.includes('orderlog',permissions), (
            <Menu.SubMenu onTitleClick={onTitleClick} key="orderRecording" icon={<Icon keys="orderRecording" />} title="订单记录">
              <Menu.Item key="communityOrder">社区订单</Menu.Item>
              <Menu.Item key="cardOrder">卡密订单</Menu.Item>
            </Menu.SubMenu>
        )) }
        { U.when(R.includes('capitalflow',permissions), (
            <Menu.Item key="capitalFlow" icon={<Icon keys="capitalFlow" />}>
              资金记录
            </Menu.Item>
        )) }
        { U.when(R.includes('usermng',permissions), (
            <Menu.Item key="user" icon={<Icon keys="user" />}>
              用户管理
            </Menu.Item>
        )) }
        { U.when(R.includes('subcitemng',permissions), (
            <Menu.SubMenu onTitleClick={onTitleClick} key="childWeb" icon={<Icon keys="childWeb" />} title="分站管理">
              <Menu.Item key="childWebList">分站列表</Menu.Item>
            </Menu.SubMenu>
        )) }
        { U.when(R.includes('citecfg',permissions), (
            <Menu.SubMenu onTitleClick={onTitleClick} key="webSetting" icon={<Icon keys="webSetting" />} title="站点设置">
              <Menu.Item key="storeSetting">店铺设置</Menu.Item>
              {/* <Menu.Item key="rebot">支付配置</Menu.Item> */}
              {/* <Menu.Item key="images">图床配置</Menu.Item> */}
              <Menu.Item key="peopleService">客服配置</Menu.Item>
              <Menu.Item key="notice">发布公告</Menu.Item>
            </Menu.SubMenu>
        )) }
         <Menu.SubMenu onTitleClick={onTitleClick} key="systemSetting" icon={<Icon keys="systemSetting" />} title="系统设置">
          { U.when(R.equals(role,"superuser"), (
            <Menu.Item key="admin">系统管理员</Menu.Item>
          )) }
          <Menu.Item key="password">修改密码</Menu.Item>
          <Menu.Item key="logger">登录日志</Menu.Item>
          {/* <Menu.Item key="about">系统信息</Menu.Item> */}
          {/* <Menu.Item key="businessSetting">业务配置</Menu.Item> */}
        </Menu.SubMenu>
      </Menu>
    )
  }

  return (
    <Layout.Sider style={{paddingTop:24}} theme="light" trigger={null} collapsible={true} collapsed={collapsed} width={200} className={c.siderLayout}>
      <MyMenu karet-lift role={role} permissions={permissions} />
    </Layout.Sider>
  )
}

function Icon ({ keys }) {
  const { selectedKeys } = getter(["selectedKeys"])
  const obj = {
    "home": {
      icon: [sider15, sider5],
      keys: ["home"]
    },
    "table": {
      icon: [sider23, sider24],
      keys: ["table"]
    },
    "statistics": {
      icon: [sider18, sider14],
      keys: ["dataStatistics", "moneyStatistics", "userStatistics", "webStatistics", "goodStatistics"]
    },
    "communityBusiness": {
      icon: [sider12, sider4],
      keys: ["communityGood", "goodCategory", "orderModel"]
    },
    "cardBusiness": {
      icon: [sider2, sider6],
      keys: ["cardGood", "cardManage", "cardCategory"]
    },
    "services": {
      icon: [sider7, sider9],
      keys: ["docking", "store", "subService"]
    },
    "orderRecording": {
      icon: [sider13, sider10],
      keys: ["communityOrder", "cardOrder"]
    },
    "capitalFlow": {
      icon: [sider17, sider3],
      keys: ["capitalFlow"]
    },
    "user": {
      icon: [sider8, sider1],
      keys: ["user"]
    },
    "webSetting": {
      icon: [sider11, sider20],
      keys: ["storeSetting", "rebot", "images", "peopleService", 'notice']
    },
    "systemSetting": {
      icon: [sider19, sider16],
      keys: ["admin", "password", "logger", "about", "businessSetting"]
    },
    "childWeb": {
      icon: [sider21, sider22],
      keys: ["childWebList"]
    },
  }

  return <>{U.ifElse(R.includes(selectedKeys, obj[keys].keys), <img src={obj[keys].icon[1]} alt="" style={{width:21,marginBottom:7,marginRight:16}} />, <img src={obj[keys].icon[0]} alt="" style={{width:21,marginBottom:7,marginRight:16}} />)}</>
}

export default SiderComponent
