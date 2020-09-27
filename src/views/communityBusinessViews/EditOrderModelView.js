import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Button, message, Breadcrumb } from 'antd'
import good5 from '../../icons/good/good5.png'
import good8 from '../../icons/good/good8.png'
import { communityParamTemplates } from "../../utils/api"
import { saveSuccess, goBack, push } from "../../utils/util"
import { useHistory } from "react-router-dom"
import DropdownComponent from "../../components/DropdownComponent"

function EditOrderModelView () {
  const { state = {} } = useHistory().location
  const { id, name: n, params: p = [] } = state
  const [name, setName] = useState(n)
  const [weight, setWeight] = useState()
  const [params, setParams] = useState(p)
  const [loading, setLoading] = useState(false)

  function save (jump) {
    if (!name || !params.length) {
      message.warning("请完善信息")
      return
    }
    if (weight > 32767 || weight < -32768) {
      message.warning("权重值超出范围")
      return
    }
    if (params.filter(i => !i.type).length) {
      message.warning("请完善信息")
      return
    }
    let body = {};
    if (n !== name) {
      body = { ...body, ...{ name } }
    }
    if (weight) {
      body = { ...body, ...{ weight } }
    }
    if (params.length) {
      body = { ...body, ...{ params } }
    }
    setLoading(true)
    communityParamTemplates(n ? 'modify' : 'add', id, undefined, body).then(r => {
      setLoading(false)
      saveSuccess(jump)
      setName(undefined)
      setWeight(undefined)
      setParams([])
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
            <span onClick={()=>push("/main/orderModel")}>下单模型</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>新增模型</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={c.main}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>新增下单模型</div>
          <div className={c.circle} />
        </div>
        <div className={c.tips}>带“ * ”的项目必须填写。</div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>模型名称</div>
          </div>
          <Input maxLength={20} onChange={e=>setName(e.target.value)} value={name} placeholder="请输入模型名称" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span className={c.white}>*</span>
            <div className={c.itemText}>排序权重</div>
          </div>
          <Input type="number" maxLength={5} placeholder="请填写权重数值，默认权重为1" onChange={e=>setWeight(e.target.value)} value={weight} className={c.itemInput}></Input>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>数值越大，排序越靠前；数值相同，商品编号越大，排序越靠前</div>
        </div>
        <div className={c.item} style={{alignItems:'flex-start'}}>
          <div className={c.itemName}>
            <span>*</span>
            <div className={c.itemText}>模型参数</div>
          </div>
          <div className={c.orderModelView}>
            <RModel params={params} setParams={setParams}/>
            <div onClick={()=>setParams([...params,...[{name:'',placeholder:'',type:''}]])} className={c.orderModelAdd}>
              <img src={good8} alt="" className={c.orderModelAddImg}/>
              <div className={c.orderModelAddText}>添加</div>
            </div>
          </div>
        </div>
        <div className={c.itemTips}>
          <div className={c.itemName} />
          <div>数值越大，排序越靠前；数值相同，商品编号越大，排序越靠前</div>
        </div>
        <div className={c.item} style={{marginTop:68}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button loading={loading} type="primary" className={c.submit} onClick={()=>save(true)}>保存</Button>
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

function RModel ({ params = [], setParams }) {
  const views = [];

  function deleteI (index) {
    const localParams = [...params]
    localParams.splice(index, 1)
    setParams(localParams)
  }

  function onChange (e, index, name) {
    const localParams = [...params]
    localParams[index][name] = name === "type" ? e : e.target.value
    setParams(localParams)
  }

  params.forEach((item, index) => {
    const { name, placeholder, type } = item
    views.push(
      <div className={c.orderInputView} key={index}>
        <Input maxLength={20} onChange={e=>onChange(e,index,"name")} value={name} placeholder="参数名称，如：数量" className={c.orderInput} style={{fontSize:'1rem'}}></Input>
        <Input maxLength={20} onChange={e=>onChange(e,index,'placeholder')} value={placeholder} placeholder="参数提示语，如：请输入数量" style={{fontSize:'1rem'}} className={c.orderInput}></Input>
        <DropdownComponent action={type} style={{width:'27.372%',height:40,marginBottom:0}} placeholder="参数类型，如：text" setAction={e=>onChange(e,index,"type")} keys={[{key:'text',name:'文本'},{key:'number',name:'数字'},{key:'url',name:'链接'}]}/>
        <Button size="small" danger className={c.orderBtn} onClick={()=>deleteI(index)}>删除</Button>
      </div>
    )
  })
  return views
}

export default EditOrderModelView
