import React from 'react'
import { Input, Checkbox, Button } from 'antd';
import auth1 from '../../icons/auth/auth1.png'
import auth2 from '../../icons/auth/auth2.png'
import auth3 from '../../icons/auth/auth3.png'
import auth4 from '../../icons/auth/auth4.png'
import { h } from '../../utils/history'

function LoginView () {

  function onChange (e) {
    console.log(`checked = ${e.target.checked}`);
  }

  function submit () {
    const history = h.get();
    history.push('/guide')
  }

  return (
    <div className="container">
      <div style={styles.imgBg}>
        <div style={styles.view}>
          <img src={auth2} alt="" style={styles.img} />
          <div style={styles.leftView}>
            <div style={styles.tipsTitle}>欢迎加入分站社区！</div>
            <div style={styles.tipsContent}>
              <div>卡密实时到账</div>
              <div>卡密实时到账</div>
              <div>社区任务超多</div>
            </div>
          </div>
          <div style={styles.rightView}>
            <div style={styles.inputView}>
              <div style={{fontSize:15,fontWeight:600,color:'#141619',marginBottom:'5%'}}>登录</div>
              <div>
                <div style={{fontWeight:"#080808",fontSize:13}}>账号</div>
                <Input size="small" style={styles.input} placeholder="请输入登录手机号" prefix={
                  <img src={ auth3 } alt="" style={{width:13,marginRight:5}}/>
                } />
              </div>
              <div>
                <div style={{fontWeight:"#080808",fontSize:13}}>密码</div>
                <Input size="small" style={styles.input}  placeholder="请输入登录密码" prefix={
                  <img src={ auth4 } alt="" style={{width:13,marginRight:5}}/>
                } />
                <Checkbox onChange={onChange} style={{color:'#2C67FF',fontSize:12,marginTop:10,display:'block'}}>自动登录</Checkbox>
              </div>
              <Button type="primary" onClick={submit} style={styles.btn}>登录</Button>
            </div>
          </div>
        </div>
        <div style={styles.bottomView}>
          <div className="f">
            <div style={styles.item}>帮助中心</div>
            <div style={styles.item}>开放平台</div>
            <div style={styles.item}>免责条款</div>
          </div>
          <div style={styles.footer}>Cooyright © 2020 光棱科技 </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  input: {
    marginTop: 5,
    width: 250,
    height: 35,
  },
  btn: {
    marginTop: '15%',
    width: 250,
    fontSize: 12,
  },
  inputView: {
    boxSizing: 'border-box',
    position: 'relative',
    zIndex: 1,
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: '8%',
    paddingBottom: '8%',
    background: '#fff',
    boxShadow: '0px 0px 11px 0px rgba(42,92,220,0.1)',
    height: '80%',
    width: '80%',
    borderRadius: 4,
    marginLeft: '10%',
    marginTop: '10%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  tipsContent: {
    width: '100%',
    paddingLeft: '10%',
    paddingRight: '10%',
    fontSize: 12,
    paddingTop: 15,
    color: '#2C67FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tipsTitle: {
    fontSize: 25,
    color: '#2C67FF',
    fontWeight: 800
  },
  img: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: "60%",
  },
  item: {
    marginLeft: 25,
    marginRight: 25,
    color: '#fff',
    fontSize: 12,
  },
  footer: {
    fontSize: 12,
    color: '#fff',
  },
  imgBg: {
    width: '100%',
    height: "100%",
    backgroundImage: `url(${auth1})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  view: {
    height: '70%',
    width: '70%',
    backgroundColor: '#fff',
    borderRadius: 20,
    position: 'relative',
    display: 'flex',
  },
  leftView: {
    boxSizing: 'border-box',
    paddingTop: '7%',
    width: '50%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  rightView: {
    height: '100%',
    width: '50%',
  },
  bottomView: {
    width: '100%',
    height: '8%',
    marginTop: '4%',
    marginBottom: '2%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
}

export default LoginView;
