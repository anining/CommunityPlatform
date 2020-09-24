import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Button, message, } from 'antd'
import good5 from '../../icons/good/good5.png'
import { goBack, saveSuccess } from "../../utils/util";
import { customerServices } from "../../utils/api";
import { useHistory } from "react-router-dom";

function AddPeopleServiceView () {
  const { state = {} } = useHistory().location
  const { id, name: n, contact: con, comment: com } = state
  const [name, setName] = useState(n)
  const [contact, setContact] = useState(con)
  const [comment, setComment] = useState(com)
  const [loading, setLoading] = useState(false)

  function save (jump) {
    if (!name || !contact) {
      message.warning("请完善信息")
      return
    }
    let body = { name, contact }
    comment && (body = { ...body, ...{ comment } })
    setLoading(true)
    customerServices(id ? 'modify' : 'add', undefined, undefined, { name, contact, comment }).then(r => {
      setLoading(false)
      saveSuccess(jump)
      setName(undefined)
      setContact(undefined)
      setComment(undefined)
    }).catch(e => {
      setLoading(false)
    })
  }

  return (
    <div className={c.container}>
      <div className={c.header}>
        <img src={good5} alt="" className={c.headerImg}/>
        <div>首页 / 站点管理 / <span>添加客服</span></div>
      </div>
      <div className={c.main}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>添加客服</div>
          <div className={c.circle} />
        </div>
        <div className={c.tips}>带“ * ”的项目必须填写。</div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>客服名称</div>
          </div>
          <Input maxLength={20} onChange={e=>setName(e.target.value)} value={name} placeholder="请输入客服名称" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>客服QQ</div>
          </div>
          <Input placeholder="请输入客服QQ" maxLength={80} onChange={e=>setContact(e.target.value)} value={contact} className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span style={{color:'#fff'}}>*</span>
            <div className={c.itemText}>客服备注</div>
          </div>
          <Input placeholder="请输入客服备注" onChange={e=>setComment(e.target.value)} value={comment} maxLength={80} className={c.itemInput}></Input>
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

export default AddPeopleServiceView
