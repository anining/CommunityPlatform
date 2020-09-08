import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Menu, Dropdown, Button, Switch, message, Radio, Checkbox } from 'antd'
import 'react-quill/dist/quill.snow.css';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import good5 from '../../icons/good/good5.png'
import auth4 from '../../icons/auth/auth4.png'

function PassWordView () {

  function save () {
    message.success({
      content: "保存成功",
    })
  }

  return (
    <div className={c.container}>
      <div className={c.header}>
        <img src={good5} alt="" className={c.headerImg}/>
        <div>首页 / 站点设置 / 修改密码 / <span>修改密码</span></div>
      </div>
      <div className={c.main} style={{marginBottom:0}}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>修改密码</div>
          <div className={c.circle} />
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>原密码</div>
          </div>
          <Input className={c.itemInput}  placeholder="请在这里输入原始密码" prefix={
            <img src={ auth4 } alt="" style={{width:14}}/>
          }/>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>新密码</div>
          </div>
          <Input.Password className={c.itemInput}  placeholder="请在这里输入新密码" prefix={
            <img src={ auth4 } alt="" style={{width:14}}/>
          }
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </div>
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button type="primary" className={c.submit} onClick={save}>保存</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PassWordView
