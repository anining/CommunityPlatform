import React, { useState, useEffect, useCallback } from 'react'
import c from '../../styles/edit.module.css'
import cs from '../../styles/business.module.css'
import edit1 from '../../icons/edit/edit1.png'
import { Button, Input, Tag, message } from 'antd'
import { tagGroups, tags as tagsApi } from "../../utils/api"

function TableView () {
  const [inputGroupVisible, setInputGroupVisible] = useState(false)
  const [inputGroupValue, setInputGroupValue] = useState()
  const [tagsGroup, setTagsGroup] = useState([])
  const saveInputGroupRef = useCallback(node => {
    node && node.focus()
  })

  useEffect(() => {
    get()
  }, [])

  function get () {
    tagGroups('get').then(r => {
      const { data, error } = r;
      !error && setTagsGroup(data)
    })
  }

  function handleInputGroupConfirm () {
    if (inputGroupValue && !tagsGroup.filter(i => i.name === inputGroupValue).length) {
      tagGroups('add', undefined, { name: inputGroupValue }).then(r => {
        !r.error && get()
      })
    } else if (inputGroupValue) {
      message.warning("重复的标签名称")
    }
    setInputGroupVisible(false)
    setInputGroupValue(undefined)
  }

  return (
    <div className={c.container}>
      <div className={c.main}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>标签管理</div>
          <div className={c.circle} />
        </div>
        <RGroup tagsGroup={tagsGroup} get={get} setTagsGroup={setTagsGroup}/>
        {inputGroupVisible && (
          <Input
            ref={saveInputGroupRef}
            type="text"
            size="small"
            maxLength={5}
            className={cs.tInputGroup}
            value={inputGroupValue}
            onChange={e=>setInputGroupValue(e.target.value)}
            onBlur={handleInputGroupConfirm}
            onPressEnter={handleInputGroupConfirm}
          />
        )}
        {!inputGroupVisible && (
          <Tag onClick={()=>setInputGroupVisible(true)} className={cs.tAddGroup}>
            <img src={edit1} alt="" />
            <div>添加分组</div>
          </Tag>
        )}
      </div>
    </div>
  )
}

function RGroup ({ tagsGroup, get, setTagsGroup }) {
  const [inputValue, setInputValue] = useState()
  const [inputVisible, setInputVisible] = useState(false)
  const [value, setValue] = useState()
  const saveInputRef = useCallback(node => {
    node && node.focus()
  })

  function handleInputConfirm (index, id) {
    if (inputValue && !tagsGroup[index].tags.filter(i => i.name === inputValue).length) {
      tagsApi('add', undefined, { name: inputValue, tag_group_id: id }).then(r => {
        !r.error && get()
      })
    } else if (inputValue) {
      message.warning("重复的标签名称")
    }
    setInputVisible(false)
    setInputValue(undefined)
  }

  function handleClose (id, index, i = -1) {
    const tags = [...tagsGroup]
    if (i > -1) {
      const v = tags[index].tags.splice(i, 1)
      setTagsGroup(tags);
      tagsApi("delete", id).then(r => {
        if (r.error) {
          tags[index].tags.splice(i, 0, v[0])
        }
      })
    } else {
      const v = tags.splice(index, 1)
      setTagsGroup(tags);
      tagGroups("delete", id).then(r => {
        if (r.error) {
          tags.splice(index, 0, v[0])
        }
      })
    }
  }

  const views = [];

  tagsGroup.forEach((item, index) => {
    const { name, tags, id } = item;
    const items = []
    tags.forEach((it, i) => {
      const { id: tag_id, name } = it
      items.push(
        <Tag key={tag_id} closable onClose={e => {
          e.preventDefault();
          handleClose(tag_id, index, i);
        }} className={cs.tagChild}>
          {name}
        </Tag>
      )
    })
    if (inputVisible && value === index) {
      items.push(
        <Input
          key={`input${id}`}
          ref={saveInputRef}
          type="text"
          size="small"
          className={cs.tInput}
          value={inputValue}
          onChange={e=>setInputValue(e.target.value)}
          onBlur={()=>handleInputConfirm(index,id)}
          onPressEnter={()=>handleInputConfirm(index,id)}
        />
      )
    } else {
      items.push(
        <Tag onClick={()=>{
          setInputVisible(true)
          setValue(index)
        }} className={cs.tAdd} key={`tag${id}`}>
          <img src={edit1} alt="" />
          <div>添加标签</div>
        </Tag>
      )
    }
    views.push(
      <div key={`item${index}`} className={cs.tItemView}>
        <Button type="small" onClick={()=>{
          handleClose(id,index)
        }} className={cs.tagTitle}>
          <div>{name}&#112288; x</div>
        </Button>
        <div className={cs.tItem}>{items}</div>
      </div>
    )
  })

  return views
}

export default TableView
