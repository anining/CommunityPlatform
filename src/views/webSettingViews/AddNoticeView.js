import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Menu, Dropdown, Button, Switch, message, Radio, Checkbox } from 'antd'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import good5 from '../../icons/good/good5.png'

function AddNoticeView () {
  const [quillValue, setQuillValue] = useState()

  function save () {
    message.success({
      content: "保存成功",
    })
  }

  return (
    <div className={c.container}>
      <div className={c.header}>
        <img src={good5} alt="" className={c.headerImg}/>
        <div>首页 / 站点设置 / 发布公告 / <span>发布新公告</span></div>
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
          <Input placeholder="请输入公告标题" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>公告内容</div>
          </div>
          <ReactQuill className={c.quill} theme="snow" value={quillValue} onChange={setQuillValue}/>
        </div>
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button type="primary" className={c.submit} onClick={save}>立即发布公告</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNoticeView
