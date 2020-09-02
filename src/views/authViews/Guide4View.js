import React from 'react'
import { Button, Input } from 'antd'
import c from '../../styles/guide.module.css'
import { h } from '../../utils/history'
import auth4 from '../../icons/auth/auth4.png'

function Guide4View () {

  function submit () {
    const history = h.get();
    history.push('/mian')
  }

  return (
    <div className={c.container}>
      <div className={c.view}>
      <Title/>
      <div className={c.content}>
        <Context/>
      </div>
      <div className={c.footer}>
        <Button type="primary" className={c.btn} onClick={submit}>完成</Button>
        <div className={c.footerText} onClick={()=>{
          const history = h.get()
          history.push('/main')
        }}>稍后设置</div>
        <Circle/>
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

function Context () {

  return (
    <div style={{width:'100%',display:'grid',placeItems:'center'}}>
      <Input.Password className={c.password} placeholder="请在这里输入新密码" prefix={
                  <img src={ auth4 } alt="" className={c.inputImg}/>
                } />
    </div>
  )
}

function Circle () {
  const views = [];
  [0, 1, 2, 3].forEach((item, index) => {
    views.push(
      <div style={{
        height: 8,
        width: 8,
        marginLeft: 4,
        marginRight: 4,
        borderRadius: 8,
        background: index !== 3 ? '#D6D7DB' : '#2C67FF'
      }} key={index}/>
    )
  })

  return <div className={c.circleView}>{views}</div>
}

export default Guide4View
