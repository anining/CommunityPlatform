import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Tooltip, Button, Radio, message, Breadcrumb, } from 'antd'
import good5 from '../../icons/good/good5.png'
import { goBack, saveSuccess, push } from "../../utils/util";
import { addUsers } from "../../utils/api";

function AddUserView () {
  const [value, setValue] = useState("normal")
  const [account, setAccount] = useState()
  const [password, setPassWord] = useState()
  const [email, setEmail] = useState()
  const [loading, setLoading] = useState(false)

  function onChange (e) {
    setValue(e.target.value)
  }

  function save (jump) {
    if (!account) {
      message.warning("请完善信息")
      return
    }
    setLoading(true)
    addUsers(account, password, value, email).then(r => {
      setLoading(false)
      saveSuccess(jump)
      setAccount(undefined)
      setPassWord(undefined)
      setEmail(undefined)
    }).catch(e => {
      setLoading(false)
    })
  }

  return (
    <div className={c.container}>
      <div className={c.header}>
        <img src={good5} alt="" className={c.headerImg}/>
        <Breadcrumb>
          <Breadcrumb.Item>
            <span onClick={()=>push("/main/home")}>首页</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span onClick={()=>push("/main/user")}>用户管理</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>添加用户</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={c.main}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>添加用户</div>
          <div className={c.circle} />
        </div>
        <div className={c.tips}>带“ * ”的项目必须填写。</div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>用户账号</div>
          </div>
          <Input maxLength={20} onChange={e=>setAccount(e.target.value)} value={account} placeholder="请输入用户账号" className={c.itemInput}></Input>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div style={{color:'#FF8D30'}}>用户默认密码为a123456，为保证账户安全，请提醒用户及时修改密码。</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span style={{color:'#fff'}}>*</span>
            <div className={c.itemText}>用户密码</div>
          </div>
          <Input placeholder="请输入用户密码" maxLength={40} onChange={e=>setPassWord(e.target.value)} value={password} className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span style={{color:'#fff'}}>*</span>
            <div className={c.itemText}>用户邮箱</div>
          </div>
          <Input placeholder="请输入用户邮箱" onChange={e=>setEmail(e.target.value)} value={email} className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span style={{color:'#fff'}}>*</span>
            <div className={c.itemText}>状态</div>
          </div>
          <Radio.Group onChange={onChange} value={value} className={c.itemGrop} style={{justifyContent:'flex-start'}}>
            <Tooltip placement="bottomRight" arrowPointAtCenter={true} color="#F7FAFF" title="正常的用户。">
              <Radio value="normal" className={c.itemRadio} style={{width:'33.333%'}}>正常</Radio>
            </Tooltip>
            <Tooltip placement="bottomRight" arrowPointAtCenter={true} color="#F7FAFF" title="被封禁的用户无法登录系统，也无法下单。">
              <Radio value="banned" className={c.itemRadio} style={{width:'33.333%'}}>封禁</Radio>
            </Tooltip>
          </Radio.Group>
        </div>
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button loading={loading} type="primary" onClick={()=>save(true)} className={c.submit}>保存</Button>
            <div className={c.btnTipsView}>
              <div className={c.quitBtn} onClick={goBack}>放弃编辑</div>
              <div className={c.quitBorder}/>
              <div className={c.saveBtn} onClick={()=>save(false)}>保存并新增</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddUserView
