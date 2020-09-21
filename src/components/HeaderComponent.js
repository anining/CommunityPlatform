import React from 'react'
import { Menu, Dropdown, Button } from 'antd'
import c from '../styles/header.module.css'
import { Layout } from 'antd'
import header1 from '../icons/header/header1.png'
import header3 from '../icons/header/header3.png'
import header4 from '../icons/header/header4.png'
import { clear } from '../utils/store'
import LogoComponent from './LogoComponent'

function HeaderComponent ({ collapsed, toggle }) {

  const menu = (
    <Menu>
      <Menu.Item className={c.item} onClick={clear} style={{display:"flex",alignItems:'center',width:164,height:50}}>
        <img src={header4} alt="" style={{width:14,marginRight:26}}/>
        <div>退出登录</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout.Header className={c.container}>
      <LogoComponent toggle={toggle}/>
      <div className={c.containerR}>
        <div style={{marginRight:24,cursor:'pointer'}} onClick={()=>{
          window.open("https://www.baidu.com")
        }}>帮助中心</div>
        <div style={{cursor:'pointer'}} onClick={()=>{
          window.open("https://www.baidu.com")
        }}>开放平台</div>
        <Dropdown overlay={menu}>
          <Button className={c.btn}>
            <img src={header1} alt="" className={c.avatar}/>
            <div>用户名</div>
            <img src={header3} alt="" className={c.down}/>
          </Button>
        </Dropdown>
        </div>
    </Layout.Header>
  )
}

export default HeaderComponent;
