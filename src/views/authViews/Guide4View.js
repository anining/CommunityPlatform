import React, { useState } from 'react'
import { Button, Input, message } from 'antd'
import c from '../../styles/guide.module.css'
import auth4 from '../../icons/auth/auth4.png'
import { push, saveSuccess } from "../../utils/util"
import Circle from "../../components/CircleComponent"
import { password } from "../../utils/api"
import { getter } from "../../utils/store"

function Guide4View () {
  const [new_password, setNew_password] = useState('')

  function submit () {
    if (!new_password) {
      message.warning("请完善信息")
      return
    }
    const { old_password } = getter(['old_password']);
    password(old_password.get(), new_password).then(r => {
      !r.error && saveSuccess(true, '/main')
    })
  }

  return (
    <div className={c.container}>
      <div className={c.view}>
      <Title/>
      <div className={c.content}>
        <Context new_password={new_password} setNew_password={setNew_password}/>
      </div>
      <div className={c.footer}>
        <Button type="primary" className={c.btn} onClick={submit}>完成</Button>
        <div className={c.footerText} onClick={()=>push('/main')}>稍后设置</div>
        <Circle i={3}/>
      </div>
      </div>
    </div>
  )
}

function Title () {

  return (
    <div className={c.text}>
      <div className={c.title}>请修改您的登录密码</div>
      <div className={c.minTitle}>你是第一次登陆，为了您的账户安全，建议您修改密码。</div>
      <div>您也可以通过“系统设置 - 修改密码”来重新设置密码。</div>
    </div>
  )
}

function Context ({ new_password, setNew_password }) {

  return (
    <div style={{width:'100%',display:'grid',placeItems:'center'}}>
      <Input.Password onChange={e=>{setNew_password(e.target.value)}} maxLength={40} value={new_password} className={c.password} placeholder="请在这里输入新密码" prefix={
                  <img src={ auth4 } alt="" className={c.inputImg}/>
                } />
    </div>
  )
}

export default Guide4View
