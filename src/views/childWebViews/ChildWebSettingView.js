import React, { useState } from 'react'
import { Input, Button, Switch, message, Radio, Checkbox } from 'antd'

function ChildWebSettingView () {

  function onChange (checked) {
    console.log(`switch to ${checked}`);
  }

  return (
    <div className="container">
      <div style={styles.main}>
        <h1>分站设置</h1>
        <div style={styles.item}>
          <div style={styles.itemName}>
            <div style={styles.itemText}>自主申请</div>
          </div>
          <div>
            <div style={{display:'flex',alignItems:'center'}}>
              <Switch defaultChecked onChange={onChange} />
              <div style={{fontSize:12,marginLeft:20,color:'#2C68FF'}}>当前状态：开启自主申请开通分站</div>
            </div>
          </div>
        </div>
        <div style={styles.itemTips}>
          <div style={styles.itemName}>
          </div>
          <div>开启时，前端页面将会展示分站开通申请入口，用户可以填写信息并且支付之后，向后</div>
        </div>
        <div style={styles.itemTips}>
          <div style={styles.itemName}>
          </div>
          <div>台发起分站开通申请。关闭时，前端不可以申请开通分站；只能后台创建分站。</div>
        </div>
        <div style={styles.item}>
          <div style={styles.itemName}>
            <div style={styles.itemText}>分站价格</div>
          </div>
          <div style={{display:'flex'}}>
            <div style={{display:'flex',marginRight:20}}>
              <div style={{height:30,width:80,background:'#2877F7',display:'grid',placeItems:'center',fontSize:12,color:'#fff'}}>基础版</div>
              <Input placeholder="请输入价格" size="small" style={{fontSize:12}}/>
            </div>
            <div style={{display:'flex'}}>
              <div style={{height:30,width:80,background:'#FDB414',display:'grid',placeItems:'center',fontSize:12,color:'#fff'}}>创业版</div>
              <Input placeholder="请输入价格" size="small" style={{fontSize:12}}/>
            </div>
          </div>
        </div>
        <div style={styles.item}>
          <div style={styles.itemName}>
            <div style={styles.itemText}>可选主域名</div>
          </div>
          <div style={{display:'flex'}}>
            <Checkbox onChange={onChange} style={{marginRight:25,fontSize:12}}>xyz.com</Checkbox>
            <Checkbox onChange={onChange}style={{marginRight:25,fontSize:12}}>xyz.cn</Checkbox>
            <Checkbox onChange={onChange}style={{marginRight:25,fontSize:12}}>abc.top</Checkbox>
          </div>
        </div>
        <div style={styles.itemTips}>
          <div style={styles.itemName}>
          </div>
          <div>前端用户自主申请时可以选择的域名列表</div>
        </div>
        <div style={{...styles.item,...{marginTop:50}}}>
          <div style={styles.itemName}>
          </div>
          <div>
            <Button type="primary" style={{width:300,marginLeft:50,fontSize:12}}>保存</Button>
            <div style={styles.btnView}>
              上次保存: 202.01.15 15:20:05
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  btnView: {
    color: '#979BA3',
    display: 'grid',
    placeItems: 'center',
    width: 300,
    fontSize: 12,
    marginLeft: 50,
    marginTop: 15,
  },
  main: {
    boxSizing: 'border-box',
    paddingTop: '2%',
    marginBottom: '2%',
    height: '100%',
    paddingLeft: '2%',
    paddingRight: '2%',
    background: '#fff',
    paddingBottom: '2%',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 25,
  },
  tips: {
    marginTop: 10,
    marginBottom: 10,
    color: '#FF5730',
    fontSize: 12,
  },
  itemName: {
    width: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  itemText: {
    color: '#34374A',
    fontWeight: 500,
    marginLeft: 5,
    marginRight: 25,
  },
  itemInput: {
    width: 400,
    fontSize: 12,
  },
  itemBtn: {
    fontSize: 12,
    height: 28,
    marginLeft: 20,
  },
  uploadTips: {
    color: '#FF5730',
    paddingBottom: 5,
    fontSize: 12,
    alignSelf: 'flex-end',
  },
  itemTips: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 5,
    color: '#919191',
    fontSize: 12,
  }
}

export default ChildWebSettingView
