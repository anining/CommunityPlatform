import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Button, message } from 'antd'
import good5 from '../../icons/good/good5.png'
import { communityGoodsCategories } from '../../utils/api'
import { saveSuccess } from "../../utils/util"
import { useHistory } from "react-router-dom"

function EditGoodCategoryView () {
  const { state = {} } = useHistory().location
  const { record = {} } = state
  const { id, name: n, weight: w } = record
  const [name, setName] = useState(n)
  const [weight, setWeight] = useState(w)

  function save () {
    if (!name || !weight) {
      message.warning("请完善信息")
      return
    }
    communityGoodsCategories(id ? "modify" : "add", id, undefined, { name, weight }).then(r => {
      setWeight(0)
      setName(undefined)
      if (!r.error) {
        saveSuccess()
      }
    })

  }

  return (
    <div className={c.container}>
      <div className={c.header}>
        <img src={good5} alt="" className={c.headerImg}/>
        <div>首页 / 社区业务 / <span>社区商品</span></div>
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
          <Input onChange={e=>setName(e.target.value)} value={name} placeholder="请输入分类名称" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>排序权重</div>
          </div>
          <Input onChange={e=>setWeight(e.target.value)} value={weight} placeholder="请填写权重数值，默认权重为1" className={c.itemInput}></Input>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>数值越大，排序越靠前；数值相同，商品编号越大，排序越靠前</div>
        </div>
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button type="primary" className={c.submit} onClick={save}>保存</Button>
            <div className={c.btnTipsView}>
              <div className={c.quitBtn}>放弃编辑</div>
              <div className={c.quitBorder}/>
              <div className={c.saveBtn}>保存并新增</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditGoodCategoryView
