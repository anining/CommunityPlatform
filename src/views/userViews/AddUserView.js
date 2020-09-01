import React, { useState } from 'react'
import { Input, Button, Upload, message, Radio, Checkbox } from 'antd'
import good5 from '../../icons/good/good5.png'

function AddUserView () {
  const [value, setValue] = useState()

  function onChange (e) {
    console.log('radio checked', e.target.value);
    setValue(e.target.value)
  }

  return (
    <div className="container">
      <div style={styles.header}>
        <img src={good5} alt="" style={{width:15,marginRight:15}}/>
        <div style={{color:'#979BA3'}}>首页 / 用户管理 / <span style={{color:'#2C68FF'}}>添加用户</span></div>
      </div>
      <div style={styles.main}>
        <h1>添加用户</h1>
        <div style={styles.tips}>带“ * ”的项目必须填写。</div>
        <div style={styles.item}>
          <div style={styles.itemName}>
            <span style={{color:'#FF5730'}}>*</span>
            <div style={styles.itemText}>用户账号</div>
          </div>
          <Input placeholder="请输入用户账户" style={styles.itemInput}></Input>
        </div>
        <div style={styles.itemTips}>
          <div style={styles.itemName}>
          </div>
          <div>用户默认密码为a123456，为保证账户安全，请提醒用户及时修改密码。</div>
        </div>
        <div style={styles.item}>
          <div style={styles.itemName}>
            <div style={styles.itemText}>用户余额</div>
          </div>
          <Input placeholder="请输入用户余额" style={styles.itemInput}></Input>
        </div>
        <div style={styles.item}>
          <div style={styles.itemName}>
            <div style={styles.itemText}>状态</div>
          </div>
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={1} style={{marginRight:50,fontSize:12,color:'#979BA3'}}>正常</Radio>
            <Radio value={2} style={{marginRight:50,fontSize:12,color:'#979BA3'}}>封禁</Radio>
          </Radio.Group>
        </div>
        <div style={{...styles.item,...{marginTop:50}}}>
          <div style={styles.itemName}>
          </div>
          <div>
            <Button type="primary" style={{width:300,marginLeft:50,fontSize:12}}>保存</Button>
            <div style={styles.btnView}>
              <div style={styles.quitBtn}>放弃编辑</div>
              <div style={styles.saveBtn}>保存并新增</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  saveBtn: {
    color: '#4177FE',
    width: '50%',
    display: 'grid',
    placeItems: 'center'
  },
  quitBtn: {
    color: '#979BA3',
    width: '50%',
    display: 'grid',
    placeItems: 'center',
    borderRightColor: '#D8D8D8',
    borderRightWidth: 1,
    borderRightStyle: 'solid'
  },
  btnView: {
    width: 300,
    fontSize: 12,
    marginLeft: 50,
    marginTop: 15,
    display: 'flex',
    alignItems: 'center'
  },
  header: {
    boxSizing: 'border-box',
    height: '7%',
    marginBottom: '2%',
    width: '100%',
    paddingLeft: '2%',
    paddingRight: '2%',
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
  },
  main: {
    boxSizing: 'border-box',
    paddingTop: '2%',
    minHeight: '50%',
    marginBottom: '2%',
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
    color: '#FF8D30',
    fontSize: 12,
  }
}

export default AddUserView
