import React, { useState, useEffect } from 'react'
import { Layout, Menu } from 'antd'
import LogoComponent from './LogoComponent'
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
import { h } from '../utils/history'

function SiderComponent ({ collapsed, toggle }) {
  const [selectedKeys, setSelectedKeys] = useState([]) // 当前选中的菜单项 key 数组
  const [openKeys, setOpenKeys] = useState([]) // 当前展开的 SubMenu 菜单项 key 数组

  useEffect(() => {
    const { pathname } = window.location
    const arr = pathname.split('/')
    arr.length && setSelectedKeys(arr[arr.length - 1])
  }, [])

  function menuItemClick ({ item, key, keyPath, domEvent }) {
    if (["home", "table", "capitalFlow", "user"].includes(key)) {
      setOpenKeys([])
    }
    const history = h.get();
    setSelectedKeys(keyPath)
    history.push(`/main/${key}`)
  }

  function onTitleClick ({ key, domEvent }) {
    if (openKeys.length && openKeys.includes(key)) {
      setOpenKeys([])
    } else {
      setOpenKeys([key])
    }
  }

  return (
    <Layout.Sider theme="light" trigger={null} collapsible={true} collapsed={collapsed} width={200}>
      <LogoComponent toggle={toggle} />
      <Menu theme="light" mode="inline"openKeys={openKeys} selectedKeys={selectedKeys} onClick={menuItemClick} multiple={false}>
        <Menu.Item key="home" icon={<Icon keys="home" selectedKeys={selectedKeys}/>}>
          用户首页
        </Menu.Item>
        <Menu.SubMenu onTitleClick={onTitleClick} key="statistics" icon={<Icon keys="statistics" selectedKeys={selectedKeys} />} title="数据统计">
          <Menu.Item key="dataStatistics">数据统计</Menu.Item>
          <Menu.Item key="moneyStatistics">资金统计</Menu.Item>
          <Menu.Item key="userStatistics">用户统计</Menu.Item>
          <Menu.Item key="webStatistics">网站访问统计</Menu.Item>
          <Menu.Item key="goodStatistics">商品订单统计</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu onTitleClick={onTitleClick} key="communityBusiness" icon={<Icon keys="communityBusiness" selectedKeys={selectedKeys} />} title="社区业务">
          <Menu.Item key="communityGood">社区商品</Menu.Item>
          <Menu.Item key="goodCategory">商品分类</Menu.Item>
          <Menu.Item key="orderModel">下单模型</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu onTitleClick={onTitleClick} key="cardBusiness" icon={<Icon keys="cardBusiness" selectedKeys={selectedKeys} />} title="卡密业务">
          <Menu.Item key="cardGood">卡密商品</Menu.Item>
          <Menu.Item key="cardManage">卡密管理</Menu.Item>
          <Menu.Item key="cardCategory">卡密分类</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu onTitleClick={onTitleClick} key="services" icon={<Icon keys="services" selectedKeys={selectedKeys} />} title="增值服务">
          <Menu.Item key="docking">对接</Menu.Item>
          <Menu.Item key="store">供货商</Menu.Item>
          <Menu.Item key="subService">开通服务</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="table" icon={<Icon keys="table" selectedKeys={selectedKeys}/>}>
          标签管理
        </Menu.Item>
        <Menu.SubMenu onTitleClick={onTitleClick} key="orderRecording" icon={<Icon keys="orderRecording" selectedKeys={selectedKeys} />} title="订单记录">
          <Menu.Item key="communityOrder">社区订单</Menu.Item>
          <Menu.Item key="cardOrder">卡密订单</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="capitalFlow" icon={<Icon keys="capitalFlow" selectedKeys={selectedKeys} />}>
          资金流水
        </Menu.Item>
        <Menu.Item key="user" icon={<Icon keys="user" selectedKeys={selectedKeys} />}>
          用户管理
        </Menu.Item>
        <Menu.SubMenu onTitleClick={onTitleClick} key="childWeb" icon={<Icon keys="childWeb" selectedKeys={selectedKeys} />} title="分站管理">
          <Menu.Item key="childWebList">分站列表</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu onTitleClick={onTitleClick} key="webSetting" icon={<Icon keys="webSetting" selectedKeys={selectedKeys} />} title="站点设置">
          <Menu.Item key="storeSetting">店铺设置</Menu.Item>
          <Menu.Item key="rebot">加款机器人</Menu.Item>
          <Menu.Item key="images">图床配置</Menu.Item>
          <Menu.Item key="peopleService">客服配置</Menu.Item>
          <Menu.Item key="notice">发布公告</Menu.Item>
          <Menu.Item key="admin">系统管理员</Menu.Item>
          <Menu.Item key="password">修改密码</Menu.Item>
          <Menu.Item key="logger">登录日志</Menu.Item>
          <Menu.Item key="about">系统信息</Menu.Item>
          <Menu.Item key="businessSetting">业务配置</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu onTitleClick={onTitleClick} key="systemSetting" icon={<Icon keys="systemSetting" selectedKeys={selectedKeys} />} title="系统设置">
        </Menu.SubMenu>
      </Menu>
    </Layout.Sider>
  )
}

function Icon ({ keys, selectedKeys = [] }) {
  const obj = {
    "home": [sider15, sider5],
    "table": [sider23, sider24],
    "statistics": [sider18, sider14],
    "communityBusiness": [sider12, sider4],
    "cardBusiness": [sider2, sider6],
    "services": [sider7, sider9],
    "orderRecording": [sider13, sider10],
    "capitalFlow": [sider17, sider3],
    "user": [sider8, sider1],
    "webSetting": [sider11, sider20],
    "systemSetting": [sider19, sider16],
    "childWeb": [sider21, sider22],
  }
  if (selectedKeys.includes(keys)) {
    return <img src={obj[keys][1]} alt="" style={{width:21,marginBottom:7,marginRight:16}} />
  }
  return <img src={obj[keys][0]} alt="" style={{width:21,marginBottom:7,marginRight:16}} />
}

export default SiderComponent
