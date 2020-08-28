import React, { useState } from 'react'
import { Input, Button, Checkbox, message, Menu, Switch } from 'antd'
import good8 from '../../icons/good/good8.png'
import { floor } from "karet.util";

function ChildWebSettingView () {

  function onChange (checked) {
    console.log(`switch to ${checked}`);
  }

  return (
    <div style={styles.main}>
        <h1>分站设置</h1>
        <div style={{display:'flex',alignItems:'center',marginTop:25}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <div style={{marginLeft:5,marginRight:25}}>自主申请</div>
          </div>
          <div>
            <div style={{display:'flex'}}>
              <Switch defaultChecked onChange={onChange} />
              <div style={{fontSize:12,marginLeft:15,color:'#2C68FF'}}>当前状态：开启自主申请开通分站</div>
            </div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:10}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
          </div>
          <div style={{color:'#919191',fontSize:12}}>开启时，前端页面将会展示分站开通申请入口，用户可以填写信息并且支付之后，向后</div>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:5}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
          </div>
          <div style={{color:'#919191',fontSize:12}}>台发起分站开通申请。关闭时，前端不可以申请开通分站；只能后台创建分站。</div>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:25}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <div style={{marginLeft:5,marginRight:25}}>分站价格</div>
          </div>
          <div style={{display:'flex'}}>
            <div style={{display:'flex',marginRight:25}}>
              <div style={{height:30,width:80,background:'#2877F7',display:'grid',placeItems:'center',fontSize:12,color:'#fff'}}>基础版</div>
              <Input placeholder="请输入价格" size="small"/>
            </div>
            <div style={{display:'flex'}}>
              <div style={{height:30,width:80,background:'#FDB414',display:'grid',placeItems:'center',fontSize:12,color:'#fff'}}>创业版</div>
              <Input placeholder="请输入价格" size="small"/>
            </div>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:25}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
            <div style={{marginLeft:5,marginRight:25}}>可选主域名</div>
          </div>
          <div style={{display:'flex'}}>
            <Checkbox onChange={onChange} style={{marginRight:50}}>xyz.com</Checkbox>
            <Checkbox onChange={onChange}style={{marginRight:50}}>xyz.cn</Checkbox>
            <Checkbox onChange={onChange}style={{marginRight:50}}>abc.top</Checkbox>
          </div>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:5}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
          </div>
          <div style={{color:'#919191',fontSize:12}}>前端用户自主申请时可以选择的域名列表</div>
        </div>
        <div style={{display:'flex',alignItems:'center',marginTop:25}}>
          <div style={{width:100,display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
          </div>
          <div>
            <Button type="primary" style={{width:300,marginLeft:50}}>保存</Button>
            <div style={{color:'#979BA3',fontSize:12,width:300,marginLeft:50,marginTop:5,textAlign:'center'}}>
              上次保存: 202.01.15 15:20:05
            </div>
          </div>
        </div>
      </div>
  )
}

const styles = {
  main: {
    boxSizing: 'border-box',
    paddingTop: '2%',
    height: '100%',
    paddingLeft: '2%',
    paddingRight: '2%',
    overflow: 'auto',
    background: '#fff',
    paddingBottom: 50,
  }
}

export default ChildWebSettingView
