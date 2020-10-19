import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Button, message, Breadcrumb } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import good5 from '../../icons/good/good5.png'
import auth4 from '../../icons/auth/auth4.png'
import { password } from '../../utils/api'
import { clear } from "../../utils/store";
import { push } from '../../utils/util';

function PassWordView () {
  const [old_password, setOld_password] = useState()
  const [new_password, setNew_password] = useState()
  const [loading, setLoading] = useState(false)

  function save () {
    if (!old_password || !new_password) {
      message.warning("请完善信息")
      return
    }
    setLoading(true)
    password(old_password, new_password).then(r => {
      setOld_password(undefined)
      setNew_password(undefined)
      if (!r.error) {
        message.success("操作成功")
        clear()
      } else {
        setLoading(false)
      }
    }).catch(() => {
      setLoading(false)
    })
  }

  return (
    <div className={c.container} style={{marginBottom:24}}>
      <div className={c.header}>
        <img src={good5} alt="" className={c.headerImg}/>
        <Breadcrumb>
          <Breadcrumb.Item>
            <span onClick={()=>push("/main/home")}>首页</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>修改密码</Breadcrumb.Item>
        </Breadcrumb>
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
          <Input maxLength={40} className={c.itemInput} onChange={e=>setOld_password(e.target.value)} value={old_password}  placeholder="请在这里输入原始密码" prefix={
            <img src={ auth4 } alt="" style={{width:14}}/>
          }/>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>新密码</div>
          </div>
          <Input.Password maxLength={40} className={c.itemInput}  placeholder="请在这里输入新密码" onChange={e=>setNew_password(e.target.value)} value={new_password} prefix={
            <img src={ auth4 } alt="" style={{width:14}}/>
          }
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
          />
        </div>
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button loading={loading} type="primary" className={c.submit} onClick={save}>保存</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PassWordView
