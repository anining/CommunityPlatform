import React, { useState, useRef, useEffect } from 'react'
import c from '../../styles/edit.module.css'
import cs from '../../styles/business.module.css'
import edit1 from '../../icons/edit/edit1.png'
import { Button, Input, Tag } from 'antd'
import { tagGroups, tags as tagsApi } from "../../utils/api"

function TableView () {
  const [inputGroupVisible, setInputGroupVisible] = useState(false)
  const [inputGroupValue, setInputGroupValue] = useState()
  const [tagsGroup, setTagsGroup] = useState([])
  const saveInputGroupRef = useRef(null)

  useEffect(() => {
    tagGroups('get').then(r => {
      const { data, error } = r;
      !error && setTagsGroup(data)
    })
  }, [])

  function handleInputGroupConfirm () {
    if (inputGroupValue && !tagsGroup.filter(i => i.name === inputGroupValue).length) {
      tagGroups('add', undefined, { name: inputGroupValue }).then(r => {
        r.error && setTagsGroup([...tagsGroup].filter(item => item.name !== inputGroupValue))
      })
      setTagsGroup([...tagsGroup, { name: inputGroupValue, tags: [] }]);
    }
    setInputGroupVisible(false)
    setInputGroupValue(undefined)
  }

  return (
    <div className={c.container}>
      <div className={c.main} style={{
        marginTop:0,
        marginBottom:24,
        paddingBottom:0,
      }}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>标签管理</div>
          <div className={c.circle} />
        </div>
        <RGroup tagsGroup={tagsGroup} setTagsGroup={setTagsGroup}/>
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
          <Tag onClick={()=>{
            setInputGroupVisible(true)
            // saveInputGroupRef.focus()
          }} className={cs.tAddGroup}>
            <img src={edit1} alt="" />
            <div>添加分组</div>
          </Tag>
        )}
      </div>
    </div>
  )
}

function RGroup ({ tagsGroup, setTagsGroup }) {
  const saveInputRef = useRef(null)
  const [inputValue, setInputValue] = useState()
  const [inputVisible, setInputVisible] = useState(false)
  const [value, setValue] = useState()

  function handleInputConfirm (index, id) {
    if (inputValue && !tagsGroup[index].tags.filter(i => i.name === inputValue).length) {
      tagsApi('add', undefined, { name: inputValue, tag_group_id: id }).then(r => {
        if (r.error) {
          const localTagsGroup = [...tagsGroup]
          localTagsGroup[index].tags.splice(-1, 1)
          setTagsGroup(localTagsGroup);
          setInputVisible(false)
          setInputValue(undefined)
        }
      })
      const tags = [...tagsGroup]
      tags[index].tags.push({ name: inputValue, id: 'templates_id' })
      setInputVisible(false)
      setInputValue(undefined)
      setTagsGroup(tags);
    }
  }

  function handleClose (id, index, i) {
    const tags = [...tagsGroup]
    if (i) {
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
          handleClose(id,index,i);
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
          // saveInputRef.focus()
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
