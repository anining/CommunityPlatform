import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Button, message, Breadcrumb } from 'antd'
import good5 from '../../icons/good/good5.png'
import { communityGoodsCategories } from '../../utils/api'
import { saveSuccess, goBack, push } from "../../utils/util"
import { useHistory } from "react-router-dom"

function EditGoodCategoryView () {
  const { state = {} } = useHistory().location
  const { id, name: n, weight: w } = state
  const [insert, setInsert] = useState(id)
  const [name, setName] = useState(n)
  const [weight, setWeight] = useState(w)
  const [loading, setLoading] = useState(false)

  function save (jump) {
    if (!name) {
      message.warning("请完善信息")
      return
    }
    if (weight > 32767 || weight < -32768) {
      message.warning("权重值超出范围")
      return
    }
    let body = {};
    if (n !== name) {
      body = { ...body, ...{ name } }
    }
    if (weight !== w) {
      body = { ...body, ...{ weight } }
    }
    setLoading(true)
    communityGoodsCategories(insert ? "modify" : "add", id, undefined, body).then(r => {
      setInsert(jump)
      setLoading(false)
      if (!r.error) {
        saveSuccess(jump)
        setName(undefined)
        setWeight(undefined)
      }
    }).catch(e => {
      setInsert(jump)
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
            <span onClick={()=>push("/main/goodCategory")}>商品分类</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>新增分类</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={c.main}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>新增社区商品分类</div>
          <div className={c.circle} />
        </div>
        <div className={c.tips}>带“ * ”的项目必须填写。</div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>分类名称</div>
          </div>
          <Input maxLength={20} onChange={e=>setName(e.target.value)} value={name} placeholder="请输入分类名称" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>排序权重</div>
          </div>
          <Input type="number" maxLength={5} onChange={e=>setWeight(e.target.value)} value={weight} placeholder="请填写权重数值，默认权重为1" className={c.itemInput}></Input>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>数值越大，排序越靠前；数值相同，商品编号越大，排序越靠前</div>
        </div>
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button type="primary" loading={loading} className={c.submit} onClick={()=>save(true)}>保存</Button>
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

export default EditGoodCategoryView
