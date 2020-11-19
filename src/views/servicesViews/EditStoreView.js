import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Button, Breadcrumb, message } from 'antd'
import 'react-quill/dist/quill.snow.css';
import good5 from '../../icons/good/good5.png'
import { push, saveSuccess } from "../../utils/util";
import { useHistory } from "react-router-dom";
import { providers } from "../../utils/api";

function EditStoreView () {
  const { state = {} } = useHistory().location
  const h = useHistory()
  const { id, nickname: n, account: a } = state

  const [loading, setLoading] = useState(false)
  const [nickname, setNickname] = useState(n)
  const [account, setAccount] = useState(a)

  function save (jump) {
    if (!nickname || !account) {
      message.warning("请完善信息")
      return
    }
    setLoading(true)
    providers(id ? "modify" : "add", id, undefined, { nickname, account }).then(r => {
      setLoading(false)
      if (!r.error) {
        setNickname("")
        setAccount("")
        saveSuccess(jump)
      }
    }).catch(() => {
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
            <span onClick={()=>push("/main/store")}>供货商</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>新增供货商</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={c.main}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>新增供货商</div>
          <div className={c.circle} />
        </div>
        <div className={c.tips}>带“ * ”的项目必须填写。</div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>供货商名称</div>
          </div>
          <Input placeholder="请输入供货商名称" className={c.itemInput} value={nickname} maxLength={20} onChange={e=>setNickname(e.target.value)}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>供货商账号</div>
          </div>
          <Input maxLength={20} value={account} onChange={e=>setAccount(e.target.value)} placeholder="请输入供货商账号" className={c.itemInput}></Input>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div style={{color:'#FF8D30'}}>供货商登录密码默认为a123456</div>
        </div>
        {/* <div className={c.item}> */}
        {/*   <div className={c.itemName}> */}
        {/*     <span className={c.white}>*</span> */}
        {/*     <div className={c.itemText}>备注</div> */}
        {/*   </div> */}
        {/*   <Input maxLength={20} value={account} onChange={e=>setAccount(e.target.value)} placeholder="请填写备注信息" className={c.itemInput}></Input> */}
        {/* </div> */}
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button type="primary" className={c.submit} loading={loading} onClick={()=>save(true)}>保存</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditStoreView
