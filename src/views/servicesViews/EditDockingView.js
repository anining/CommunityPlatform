import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Button, Breadcrumb } from 'antd'
import good5 from '../../icons/good/good5.png'
import DropdownComponent from "../../components/DropdownComponent";
import {push} from "../../utils/util";

function EditDockingView () {

  return (
    <div className={c.container}>
      <div className={c.header}>
        <img src={good5} alt="" className={c.headerImg}/>
        <Breadcrumb>
          <Breadcrumb.Item>
            <span onClick={()=>push("/main/home")}>首页</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span onClick={()=>push("/main/docking")}>对接</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>新增对接</Breadcrumb.Item>
        </Breadcrumb>
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
          <DropdownComponent keys={[]} placeholder="同系统" style={{
            width: '29.25%',
            height: 40,
            marginTop:0,
            marginLeft:0,
            marginBottom:0,
            marginRight:0,
            color: 'rgba(0,0,0,0.25)',
          }}/>
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
