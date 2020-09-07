import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Menu, Dropdown, Button, Upload, message, Radio, Checkbox } from 'antd'
import good5 from '../../icons/good/good5.png'
import { DownOutlined, UserOutlined, SearchOutlined } from '@ant-design/icons';

function EditDockingView () {

  function handleMenuClick (e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        1st menu item
      </Menu.Item>
      <Menu.Item key="2">
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3">
        3rd menu item
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={c.container}>
      <div className={c.header}>
        <img src={good5} alt="" className={c.headerImg}/>
        <div>首页 / 增值服务 / <span>对接</span></div>
      </div>
      <div className={c.main}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>新增对接</div>
          <div className={c.circle} />
        </div>
        <div className={c.tips}>带“ * ”的项目必须填写。</div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>名称</div>
          </div>
          <Input placeholder="请输入分类的名称" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>对接系统</div>
          </div>
          <Dropdown overlay={menu}>
            <Button size="small" className={c.itemDropdown}>
              <div className={c.hiddenText}>
                同系统
              </div>
              <DownOutlined />
            </Button>
          </Dropdown>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>站点域名</div>
          </div>
          <Input placeholder="请输入站点域名" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>登录账户</div>
          </div>
          <Input placeholder="在对接系统的登录账号" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>登录密码</div>
          </div>
          <Input placeholder="在对接系统的登录密码" className={c.itemInput}></Input>
        </div>
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button type="primary" className={c.submit}>保存</Button>
            <div className={c.btnTipsView}>
              <div className={c.quitBtn}>放弃编辑</div>
              <div className={c.quitBorder}/>
              <div className={c.saveBtn}>保存并新增</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditDockingView
