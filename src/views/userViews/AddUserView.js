import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import * as U from 'karet.util'
import { Input, Tooltip, Button, Radio, message, Breadcrumb, } from 'antd'
import good5 from '../../icons/good/good5.png'
import good46 from '../../icons/good/good46.png'
import good47 from '../../icons/good/good47.png'
import good48 from '../../icons/good/good48.png'
import good68 from '../../icons/good/good68.png'
import good74 from '../../icons/good/good74.png'
import { goBack, saveSuccess, push } from "../../utils/util";
import { addUsers } from "../../utils/api";
import ModalComponent from "../../components/ModalComponent"

function AddUserView () {
  const [visible, setVisible] = useState(false)
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
      if (!r.error) {
        saveSuccess(jump)
        setAccount(undefined)
        setPassWord(undefined)
        setEmail(undefined)
      }
    }).catch(() => {
      setLoading(false)
    })
  }

  function onCancel () {
    setVisible(false)
  }

  function onOk () {

  }

  return (
    <div className={c.container}>
      <ModalComponent
        src={good74}
        div="当前选中商品："
        title="您确定要重置登录密码吗？"
        child={
          <div style={{color:'#BFBFBF'}}>重置密码将会修改管理员密码为<span style={{color:"#FF5730"}}>a123456</span></div>
        }
        visible={visible}
        onCancel={onCancel}
        onOk={onOk}
      />
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
        <div className={c.item}>
          <div className={c.itemName}>
            <span style={{color:'#fff'}}>*</span>
            <div className={c.itemText}>登录密码</div>
          </div>
          <div style={{width:'29.25%'}}>
            {
              U.when(true,
              <Button type="primary" style={{width:120,height:40,marginBottom:6}}>重置密码</Button>
            )
            }
            <div style={{color:'#FF8D30'}}>用户登录默认密码 ： a123456；忘记密码可通过修改用户管理来重置密码。为保证账户安全，请提醒用户及时修改密码。。</div>
          </div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>统一密价</div>
          </div>
          <Radio.Group style={{flexWrap:'wrap'}} onChange={e=>{}} className={c.itemGrop}>
            <Radio value="available" className={c.item_user_radio}>
              <img src={good68} alt="" />
              普通会员
            </Radio>
            <Radio value="available" className={c.item_user_radio}>
              <img src={good46} alt="" />
              高级会员
            </Radio>
            <Radio value="paused" className={c.item_user_radio}>
              <img src={good48} alt="" />
              钻石会员
            </Radio>
            <Radio value="unavailable" className={c.item_user_radio}>
              <img src={good47} alt="" />
              至尊会员
            </Radio>
          </Radio.Group>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddUserView
