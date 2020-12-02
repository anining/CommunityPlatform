import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Button, message, Breadcrumb } from 'antd'
import good5 from '../../icons/good/good5.png'
import { announcements } from "../../utils/api";
import { saveSuccess, push } from "../../utils/util";
import { storage } from '../../utils/storage'
import Quill from '../../components/Quill.jsx'

function AddNoticeView () {
  const [title, setTitle] = useState()
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  function save () {
    if (!title || !content) {
      message.warning("请完善信息")
      return
    }
    setLoading(true)
		const merchant_id = storage.getItem("merchant_id")
		announcements("add", undefined, undefined, {title, content, merchant_id: merchant_id}).then(r => {
      setLoading(false)
      if (!r.error) {
        saveSuccess()
        setTitle(undefined)
        setContent(undefined)
      }
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
            <span onClick={()=>push("/main/notice-setting")}>发布公告</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>新增公告</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={c.main} style={{marginBottom:0}}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>新增公告</div>
          <div className={c.circle} />
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>公告标题</div>
          </div>
          <Input maxLength={40} onChange={e=>setTitle(e.target.value)} value={title} placeholder="请输入公告标题" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>公告内容</div>
          </div>
					<Quill value={content} setValue={setContent} />
        </div>
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button type="primary" className={c.submit} onClick={save} loading={loading}>立即发布公告</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNoticeView
