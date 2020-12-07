import * as React from 'karet'
import * as U from 'karet.util'
import * as R from 'kefir.ramda'
import { useEffect } from 'react'
import { Layout, Menu } from 'antd'
import c from '../styles/header.module.css'
import sider1 from '../icons/sider/sider1.png'
import sider2 from '../icons/sider/sider2.png'
import sider3 from '../icons/sider/sider3.png'
import sider17 from '../icons/sider/sider17.png'
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
import sider18 from '../icons/sider/sider18.png'
import sider19 from '../icons/sider/sider19.png'
import sider20 from '../icons/sider/sider20.png'
import sider21 from '../icons/sider/sider21.png'
import sider22 from '../icons/sider/sider22.png'
import sider23 from '../icons/sider/sider23.png'
import sider24 from '../icons/sider/sider24.png'
import sider25 from '../icons/sider/sider25.png'
import sider26 from '../icons/sider/sider26.png'
import sider27 from '../icons/sider/sider27.png'
import sider28 from '../icons/sider/sider28.png'
import { getter, setter } from "../utils/store"
import { push } from "../utils/util"

function SiderComponent ({ collapsed  }) {
  const { role, openKeys, selectedKeys, permissions } = getter(["permissions", "selectedKeys", "openKeys", "role"])

  useEffect(() => {
		const obj = {
			"home": "home",
			"label": "label",
			"data-statistics": "statistics",
			"funds-statistics": "statistics",
			"user-statistics": "statistics",
			"web-statistics": "statistics",
			"goods-statistics": "statistics",
			"goods-community":"community",
			"category-community":"community",
			"markup-community":"community",
			"goods-card":"card",
			"manage-card":"card",
			"category-card":"card",
			"service":"services",
			"docking":"docking",
			"store":"store",
			"community-recording":"recording",
			"card-recording":"recording",
			"flow":"flow",
			"user":"user",
			"storeSetting":"setting",
			"rebot-setting":"setting",
			"images-setting":"setting",
			"people-setting":"setting",
			"notice-setting":"setting",
			"admin-system":"system",
			"password-system":"system",
			"logger-system":"system",
			"about-system":"system",
			"business-system":"system",
			"list-web":"web",
		}
    const { pathname } = window.location
    const p = pathname.split('/')
		if(p.length) {
			setter([["selectedKeys", p[p.length - 1]]]);
      setter([["openKeys", [obj[p[p.length - 1]]]]])
		}
  }, [])

  function menuItemClick ({ key, keyPath }) {
    if (["home", "label", "store", "docking", "flow", "user"].includes(key)) {
      setter([["openKeys", []]])
    }
    setter([["selectedKeys", keyPath]])
    push(`/main/${key}`)
  }

  function onTitleClick ({ key }) {
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
      <Menu karet-lift theme="light" mode="inline" className="user-select" openKeys={U.template(openKeys)} selectedKeys={U.template(selectedKeys)} onClick={menuItemClick} multiple={false}>
        <Menu.Item key="home" icon={<Icon keys="home" />}>
          用户主页
        </Menu.Item>
				{/* <> */}
        {/* { U.when(R.includes('statistics',permissions), ( */}
				{/* 	<Menu.SubMenu onTitleClick={onTitleClick} key="statistics" title={<Title keys="statistics" label="数据统计"/>}> */}
            {/* <Menu.Item key="data-statistics">数据概览</Menu.Item> */}
            {/* <Menu.Item key="funds-statistics">资金统计</Menu.Item> */}
            {/* <Menu.Item key="goods-statistics">商品&订单统计</Menu.Item> */}
            {/* <Menu.Item key="user-statistics">用户统计</Menu.Item> */}
            {/* <Menu.Item key="web-statistics">网站访问统计</Menu.Item> */}
          {/* </Menu.SubMenu> */}
        {/* )) } */}
        {
          U.when(R.includes('cmntbiz',permissions), (
            <Menu.SubMenu onTitleClick={onTitleClick} key="community" title={<Title keys="community" label="社区商品"/>}>
              <Menu.Item key="goods-community">社区商品列表</Menu.Item>
              <Menu.Item key="category-community">社区商品分类</Menu.Item>
              <Menu.Item key="markup-community">调价模版</Menu.Item>
            </Menu.SubMenu>
          ))
        }
				{/* 	{ U.when(R.includes('cardbiz',permissions), ( */}
				{/* 			<Menu.SubMenu onTitleClick={onTitleClick} key="card" title={<Title keys="card" label="卡密业务"/>}> */}
				{/* 				<Menu.Item key="goods-card">卡密商品列表</Menu.Item> */}
				{/* 				<Menu.Item key="category-card">卡密商品分类</Menu.Item> */}
				{/* 				<Menu.Item key="manage-card">卡密管理</Menu.Item> */}
				{/* 			</Menu.SubMenu> */}
				{/* 	)) } */}
        {
          U.when(R.includes('tagmng', permissions), (
            <Menu.Item key="label" icon={<Icon keys="label" />}>
              商品标签
            </Menu.Item>
          ))
        }
        {
          U.when(R.includes('valueaddedsrv', permissions), (
            <Menu.Item key="store" icon={<Icon keys="store" />}>
              供应商
            </Menu.Item>
          ))
        }
        {
          U.when(R.includes('valueaddedsrv', permissions), (
            <Menu.Item key="docking" icon={<Icon keys="docking" />}>
              对接/串货
            </Menu.Item>
          ))
        }
				{/* <> */}
        {/* { U.when(R.includes('valueaddedsrv',permissions), ( */}
            {/* <Menu.SubMenu onTitleClick={onTitleClick} key="services" title={<Title keys="services" label="增值服务" />}> */}
              {/* <Menu.Item key="service-services">开通服务</Menu.Item> */}
            {/* </Menu.SubMenu> */}
        {/* )) } */}
				{/* </> */}
				{/* <> */}
        {
          U.when(R.includes('orderlog',permissions), (
            <Menu.SubMenu onTitleClick={onTitleClick} key="recording" title={<Title keys="recording" label="订单记录" />}>
              {/* <Menu.Item key="community-recording">社区订单</Menu.Item> */}
              {/* <Menu.Item key="card-recording">卡密订单</Menu.Item> */}
            </Menu.SubMenu>
          ))
        }
        {
          U.when(R.includes('capitalflow',permissions), (
            <Menu.Item key="flow" icon={<Icon keys="flow" />}>
              资金记录
            </Menu.Item>
					))
        }
        {
          U.when(R.includes('usermng',permissions), (
            <Menu.Item key="user" icon={<Icon keys="user" />} >
              用户管理
            </Menu.Item>
          ))
        }
				{/* <> */}
        {/* { U.when(R.includes('subcitemng',permissions), ( */}
            {/* <Menu.SubMenu onTitleClick={onTitleClick} key="web" title={<Title keys="web" label="分站管理" />}> */}
              {/* <Menu.Item key="list-web">分站列表</Menu.Item> */}
            {/* </Menu.SubMenu> */}
        {/* )) } */}
				{/* </> */}
        {
          U.when(R.includes('citecfg',permissions), (
            <Menu.SubMenu onTitleClick={onTitleClick} key="setting" title={<Title keys="setting"  label="站点设置"/>}>
              <Menu.Item key="store-setting">店铺设置</Menu.Item>
              <Menu.Item key="plug-setting">店铺装修</Menu.Item>
              {/* <Menu.Item key="rebot-setting">支付配置</Menu.Item> */}
              {/* <Menu.Item key="images-setting">图床配置</Menu.Item> */}
              <Menu.Item key="people-setting">客服配置</Menu.Item>
              <Menu.Item key="notice-setting">发布公告</Menu.Item>
            </Menu.SubMenu>
          ))
        }
        <Menu.SubMenu onTitleClick={onTitleClick} key="system" title={<Title keys="system" label="系统设置" />}>
          { 
            U.when(R.equals(role, "superuser"), <Menu.Item key="admin-system">系统管理员</Menu.Item>)
          }
          <Menu.Item key="logger-system">登录日志</Menu.Item>
         {/* <Menu.Item key="business-system">业务配置</Menu.Item> */}
         {/* <Menu.Item key="about-system">系统信息</Menu.Item> */}
         <Menu.Item key="password-system">修改密码</Menu.Item>
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

function Title ({ keys, label }) {
  const { selectedKeys } = getter(["selectedKeys"])
  const obj = {
    "home": {
      icon: [sider15, sider5],
      keys: ["home"],
			c: "home_icon"
    },
    "label": {
      icon: [sider23, sider24],
      keys: ["label"],
			c: "table_icon_customize"
    },
    "statistics": {
      icon: [sider18, sider14],
      keys: ["data-statistics", "funds-statistics", "user-statistics", "web-statistics", "goods-statistics"],
			c: "statistics_icon"
    },
    "community": {
      icon: [sider12, sider4],
      keys: ["goods-community", "category-community", "markup-community"],
			c: "communityBusiness_icon"
    },
    "card": {
      icon: [sider2, sider6],
      keys: ["goods-card", "manage-card", "category-card"],
			c: "cardBusiness_icon"
    },
    "services": {
      icon: [sider7, sider9],
      keys: ["service"],
			c: "services_icon"
    },
    "docking": {
      icon: [sider25, sider26],
      keys: ["docking"],
			c: "docking_icon"
    },
    "store": {
      icon: [sider27, sider28],
      keys: ["store"],
			c: "store_icon"
    },
    "recording": {
      icon: [sider13, sider10],
      keys: ["community-recording", "card-recording"],
			c: "orderRecording_icon"
    },
    "flow": {
      icon: [sider17, sider3],
      keys: ["flow"],
			c: "capitalFlow_icon"
    },
    "user": {
      icon: [sider8, sider1],
      keys: ["user"],
			c: "user_icon"
    },
    "setting": {
      icon: [sider11, sider20],
      keys: ["store-setting", "plug-setting", "rebot-setting", "images-setting", "people-setting", 'notice-setting'],
			c: "webSetting_icon"
    },
    "system": {
      icon: [sider19, sider16],
      keys: ["admin-system", "password-system", "logger-system", "about-system", "business-system"],
			c: "systemSetting_icon"
    },
    "web": {
      icon: [sider21, sider22],
      keys: ["list-web"],
			c: "childWeb_icon"
    }
  }
	return (
		<div style={{backgroundImage: U.ifElse(R.includes(selectedKeys, obj[keys].keys), `url(${obj[keys].icon[1]})`, `url(${obj[keys].icon[0]})`)}} className={obj[keys].c}>
			<span>{label}</span>
		</div>
	)
}

function Icon ({ keys }) {
  const { selectedKeys } = getter(["selectedKeys"])
  const obj = {
    "home": {
      icon: [sider15, sider5],
      keys: ["home"]
    },
    "label": {
      icon: [sider23, sider24],
      keys: ["label"]
    },
    "statistics": {
      icon: [sider18, sider14],
      keys: ["data-statistics", "funds-statistics", "user-statistics", "web-statistics", "goods-statistics"]
    },
    "community": {
      icon: [sider12, sider4],
      keys: ["goods-community", "category-community"]
    },
    "card": {
      icon: [sider2, sider6],
      keys: ["goods-card", "manage-card", "category-card"]
    },
    "services": {
      icon: [sider7, sider9],
      keys: ["service"]
    },
    "docking": {
      icon: [sider25, sider26],
      keys: ["docking"]
    },
    "store": {
      icon: [sider27, sider28],
      keys: ["store"]
    },
    "recording": {
      icon: [sider13, sider10],
      keys: ["community-recording", "card-recording"]
    },
    "flow": {
      icon: [sider17, sider3],
      keys: ["flow"]
    },
    "user": {
      icon: [sider8, sider1],
      keys: ["user"]
    },
    "setting": {
      icon: [sider11, sider20],
      keys: ["store-setting", "plug-setting", "rebot-setting", "images-setting", "people-setting", 'notice-setting']
    },
    "system": {
      icon: [sider19, sider16],
      keys: ["admin-system", "password-system", "logger-system", "about-system", "business-system"]
    },
    "web": {
      icon: [sider21, sider22],
      keys: ["list-web"]
    },
  }

  return <>{U.ifElse(R.includes(selectedKeys, obj[keys].keys), <img src={obj[keys].icon[1]} alt="" style={{width:21,marginBottom:7,marginRight:16}} />, <img src={obj[keys].icon[0]} alt="" style={{width:21,marginBottom:7,marginRight:16}} />)}</>
}

export default SiderComponent
