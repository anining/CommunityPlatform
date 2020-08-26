import React from 'react'
import { Input, Checkbox, Button } from 'antd';
import { UserOutlined, PauseOutlined } from '@ant-design/icons';
import auth1 from '../../icons/auth/auth1.png'
import auth2 from '../../icons/auth/auth2.png'

function LoginView () {

  function onChange (e) {
    console.log(`checked = ${e.target.checked}`);
  }

  return (
    <div style={styles.container}>
      <div style={styles.imgBg}>
        <div style={styles.view}>
          <div style={styles.tips}>
            <div style={styles.tipsTitle}>欢迎加入分站社区！</div>
            <div style={styles.tipsContent}>
              <div>卡密实时到账</div>
              <div>卡密实时到账</div>
              <div>社区任务超多</div>
            </div>
          </div>
          <img src={auth2} alt="" style={styles.img} />
          <div style={styles.inputView}>
            <div style={{fontSize:15,fontWeight:600,color:'#141619'}}>登录</div>
            <div>
              <div style={{fontWeight:"#080808",fontSize:13}}>账号</div>
              <Input style={styles.input} size="large" placeholder="请输入登录手机号" prefix={<UserOutlined />} />
            </div>
            <div>
              <div style={{fontWeight:"#080808",fontSize:13}}>密码</div>
              <Input style={styles.input} size="large" placeholder="请输入登录密码" prefix={<PauseOutlined />} />
            </div>
            <Checkbox onChange={onChange} style={{color:'#2C67FF',fontSize:12}}>自动登录</Checkbox>
            <Button type="primary" style={styles.btn}>登录</Button>
          </div>
        </div>
        <div style={styles.itemView}>
          <div style={styles.item}>帮助中心</div>
          <div style={styles.item}>开放平台</div>
          <div style={styles.item}>免责条款</div>
        </div>
        <div style={styles.footer}>Cooyright © 2020 光棱科技 </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    width: '100%',
    height: '100%',
  },
  input: {
    marginTop: 5,
  },
  btn: {
    width: '80%',
  },
  inputView: {
    boxSizing: 'border-box',
    paddingLeft: '10%',
    paddingTop: '5%',
    paddingBottom: '5%',
    position: 'absolute',
    right: '5%',
    background: '#fff',
    boxShadow: '0px 0px 11px 0px rgba(42,92,220,0.1)',
    bottom: '10%',
    height: '80%',
    width: '45%',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  tipsContent: {
    width: '100%',
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: 15,
    color: '#2C67FF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tipsTitle: {
    fontSize: 30,
    color: '#2C67FF',
    fontWeight: 800
  },
  tips: {
    width: '50%',
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 350,
    height: 245.1
  },
  item: {
    marginLeft: 25,
    marginRight: 25,
    color: '#fff',
    marginTop: '10%',
  },
  footer: {
    fontSize: 12,
    color: '#fff',
    marginBottom: '3%',
  },
  imgBg: {
    width: '100%',
    height: '100%',
    backgroundImage: `url(${auth1})`,
    backgroundSize: "100% 100%",
    // paddingTop: '56.25%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#6e98ff'
  },
  view: {
    height: '70%',
    width: '70%',
    backgroundColor: '#fff',
    borderRadius: 32,
    marginTop: '6%',
    position: 'relative',
  },
  itemView: {
    display: 'flex',
  }
}

export default LoginView;
