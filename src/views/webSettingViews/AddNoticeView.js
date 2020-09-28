import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Button, message, Breadcrumb } from 'antd'
import ReactQuill from 'react-quill';
import good5 from '../../icons/good/good5.png'
import { announcements } from "../../utils/api";
import { saveSuccess, push } from "../../utils/util";
import { MODULES } from "../../utils/config";

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
    announcements("add", undefined, undefined, { title, content }).then(r => {
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
            <span onClick={()=>push("/main/notice")}>发布公告</span>
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
            <span className={c.white}>*</span>
            <div className={c.itemText}>公告标题</div>
          </div>
          <Input maxLength={40} onChange={e=>setTitle(e.target.value)} value={title} placeholder="请输入公告标题" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>公告内容</div>
          </div>
          <ReactQuill modules={MODULES} className={c.quill} theme="snow" value={content} onChange={e=>setContent(e)}/>
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
