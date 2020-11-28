import React, { useState } from 'react'
import c from '../../styles/login.module.css'
import { Input, message, Button } from 'antd';
import auth2 from '../../icons/auth/auth2.png'
import auth3 from '../../icons/auth/auth3.png'
import auth4 from '../../icons/auth/auth4.png'
import { login, currentManager } from '../../utils/api'
import { setter } from '../../utils/store'
import { push } from "../../utils/util";
import { storage } from "../../utils/storage";
import { PERMISSION } from "../../utils/config"

function LoginView () {
  const [account, setAccount] = useState()
  const [password, setPassword] = useState()
  const [loading, setLoading] = useState(false)

  function onChange (e, key) {
    const { value } = e.target;
    switch (key) {
      case 1:
        setAccount(value);
        break;
      default:
        setPassword(value)
    }
  }

  function submit () {
    if (!account) {
      message.warning("请输入账号")
      return
    }
    if (!password) {
      message.warning("请输入密码")
      return
    }
    setLoading(true)
    const promise = login(account, password)
    setter([["old_password", password]], true)
    setPassword(undefined)
    promise.then(r => {
      setLoading(false)
      const { error, data } = r;
      if (!error) {
        // const { access_token, disclaimer_agreed, role } = data;
        // setter([['authorization', `Bearer ${access_token}`], ['disclaimer_agreed', disclaimer_agreed], ['role', role]], true);
        // const permissions = storage.getItem("permissions");
        // if (permissions) {
        //   setter([['permissions', permissions]]);
        //   push('/main')
        //   get()
        // } else {
        //   get(true)
        // }
				// 只获取到token
        const {access_token} = data;
        setter([['authorization', `Bearer ${access_token}`], ['role', "superuser"]], true);
        setter([['permissions', PERMISSION]], true);
        push('/main')
				//
      }
    }).catch(e => {
      setLoading(false)
    })
  }

  function get (jump) {
    currentManager().then(r => {
      const { data, error } = r
      if (!error) {
        const { permissions, nickname, role,  created_at } = data
        setter([["nickname", nickname], ['permissions', role === "superuser" ? PERMISSION : permissions]], true);
        jump && push('/main')
      }
    })
  }

  return (
    <div className="container">
      <div className={c.bg}>
        <div className={c.topView}>
          <img src={auth2} alt="" className={c.img} />
          <div className={c.leftView}>
            <div className={c.tipsTitle}>欢迎使用义舟系统!</div>
            <div className={c.tipsContent}>
              <div>用户密价</div>
              <div>开放接口</div>
              <div>一键串货</div>
            </div>
          </div>
          <div className={c.rightView}>
            <div className={c.inputView}>
              <div className={c.inputTitle}>商户端登录</div>
              <div className={c.inputItem}>
                <div className={c.inputText}>账号</div>
                <Input size="small" maxLength={20} onChange={e=>onChange(e,1)} value={account} className={c.input} placeholder="请输入登录手机号" prefix={
                  <img src={ auth3 } alt="" className={c.inputImg}/>
                } />
              </div>
              <div className={c.inputItem} style={{height:'25.677%',marginTop:'9.576%',marginBottom:'18.04%'}}>
                <div className={c.inputText}>密码</div>
                <Input size="small" maxLength={40} onPressEnter={submit} type="password" onChange={e=>onChange(e,2)} value={password} className={c.input}  placeholder="请输入登录密码" prefix={
                  <img src={ auth4 } alt="" className={c.inputImg}/>
                  } style={{height:'40.15%'}}/>
                <div style={{opacity:0}}>login</div>
              </div>
              <Button loading={loading} type="primary" onClick={submit} className={c.btn}>登录</Button>
            </div>
          </div>
        </div>
        {/* <div className={c.bottomView}> */}
        {/*   <div className={c.footerView}> */}
        {/*     <div className={c.item}>帮助中心</div> */}
        {/*     <div className={c.item}>开放平台</div> */}
        {/*     <div className={c.item}>免责条款</div> */}
        {/*   </div> */}
        {/*   <div className={c.footer}>Cooyright © 2020 光棱科技 </div> */}
        {/* </div> */}
      </div>
    </div>
  )
}

export default LoginView;
