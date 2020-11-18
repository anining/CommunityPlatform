import React, { useState, useEffect } from 'react'
import c from '../../styles/edit.module.css'
import cs from '../../styles/business.module.css'
import edit21 from '../../icons/edit/edit21.png'
import edit22 from '../../icons/edit/edit22.png'
import edit24 from '../../icons/edit/edit24.png'
import edit25 from '../../icons/edit/edit25.png'
import edit26 from '../../icons/edit/edit26.png'
import { Button } from 'antd'
import { tagGroups } from "../../utils/api"

function SelectTableView () {
  const [tagsGroup, setTagsGroup] = useState([])
  const [selects, setSelects] = useState([])

  useEffect(() => {
    tagGroups('get').then(r => {
      const { data, error } = r;
      !error && setTagsGroup(data)
    })
  }, [])

  function okSave () {
    window.opener.localClick('tables', selects)
  }

  return (
    <div className={c.container} style={{
      background:'#F0F2F5',
      padding:24
    }}>
      <div className={c.main} style={{
        marginTop:0,
        marginBottom:0,
        paddingBottom:0,
      }}>
        <div className={c.table_header}>
          <div style={{zIndex:1}}>选择标签</div>
          <div className={c.table_circle} />
          <div className={c.table_header_btn_view}>
						<Button onClick={()=>window.opener.localTable()} className={c.table_btn}>编辑标签</Button>
            <div>编辑标签会离开这页面，请先保存已填写的内容。</div>
          </div>
        </div>
        <RGroup tagsGroup={tagsGroup} setTagsGroup={setTagsGroup} selects={selects} setSelects={setSelects}/>
        <div className={c.selectTabBtnV} style={{marginTop:50,marginBottom:50}}>
          <Button size="small" type="primary" className={c.selectTableCBtn} onClick={()=>window.opener.localClick('tables', [])}>取消</Button>
          <Button className={c.selectTableOkBtn} size="small" type="primary" onClick={okSave}>确定</Button>
        </div>
      </div>
    </div>
  )
}

function RGroup ({ tagsGroup, setTagsGroup, selects, setSelects }) {

  function handleClose (it) {
    let index
    const localSelects = [...selects]
    localSelects.forEach((item, i) => {
      if (item.id === it.id) {
        index = i
        return
      }
    })
    if (index > -1) {
      index > -1 && localSelects.splice(index, 1)
    } else {
      localSelects.push(it)
    }
    setSelects(localSelects)
  }

  const views = [];

  tagsGroup.forEach((item, index) => {
    const { name, tags, id } = item;
    const items = []
    tags.forEach((it, i) => {
      const { id: tag_id, name } = it
      const val = selects.filter(i => i.id === tag_id).length
      items.push(
        <Button key={tag_id} onClick={() => {
          handleClose(it);
        }} className={cs.tagChild} style={{
          background:val ? "#2C68FF" : "#fff",
          borderColor: val ? "#2C68FF" : 'rgba(0,0,0,0.15)',
          color: val ? "#fff" : "rgba(0, 0, 0, 0.65)",
        }}>
          <div style={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
          }}>
            {name}
            <img src={val?edit24:edit26} alt="" style={{width:9,marginLeft:18}}/>
          </div>
        </Button>
      )
    })
    views.push(
      <div key={`item${index}`} className={cs.tItemView}>
        <Button type="small" onClick={()=>{
          handleClose(id,index)
        }} className={cs.tagTitle}>
          {name}
        </Button>
        <div className={cs.tItem}>{items}</div>
      </div>
    )
  })

  return views
}

export default SelectTableView
