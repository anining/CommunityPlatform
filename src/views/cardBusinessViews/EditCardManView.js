import React, { useState } from 'react'
import c from '../../styles/edit.module.css'
import { Input, Radio, Table, Button, message, Breadcrumb } from 'antd'
import good5 from '../../icons/good/good5.png'
import good8 from '../../icons/good/good8.png'
import good55 from '../../icons/good/good55.png'
import good48 from '../../icons/good/good48.png'
import good47 from '../../icons/good/good47.png'
import good54 from '../../icons/good/good54.png'
import { communityParamTemplates } from "../../utils/api"
import { saveSuccess, goBack, push } from "../../utils/util"
import { useHistory } from "react-router-dom"
import DropdownComponent from "../../components/DropdownComponent"

function EditCardManView () {
  const h = useHistory()
  const { state = {} } = useHistory().location
  const { id, name: n, params: p = [], weight: w } = state
  const [name, setName] = useState(n)
  const [weight, setWeight] = useState(w)
  const [params, setParams] = useState(p)
  const [loading, setLoading] = useState(false)

  const columns = [
    {
      title: '参数类型',
      dataIndex: 'type',
      align: 'center',
  },
    {
      title: '参数说明',
      dataIndex: 'intro',
      align: 'center',
  },
  ]
  const dataSource = [
    { type: 'text', intro: "允许输入任意文字类型内容" },
    { type: 'number', intro: "只允许输入数字类型内容" },
    { type: 'url', intro: "验证输入框内的内容必须包含至少一条链接" },
  ]

  function save (jump) {
    if (!name) {
      message.warning("请完善信息")
      return
    }
    if (weight > 32767 || weight < -32768) {
      message.warning("权重值超出范围")
      return
    }
    if (params.filter(i => i.type).length === 0) {
      message.warning("请完善信息")
      return
    }
    setLoading(true)
    communityParamTemplates(id ? 'modify' : 'add', id, undefined, { name, weight: weight || 1, params }).then(r => {
      setLoading(false)
      if (!jump) {
        h.replace('/main/editOrderModel')
      }
      if (!r.error) {
        saveSuccess(jump)
        setName(undefined)
        setWeight(undefined)
        setParams([])
      }
    }).catch(() => {
      if (!jump) {
        h.replace('/main/editOrderModel')
      }
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
            <span onClick={()=>push("/main/cardManage")}>卡密管理</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>修改卡密</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={c.main} style={{marginTop:24}}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>修改卡密</div>
          <div className={c.circle} />
        </div>
        <div className={c.tem_header}>
          <img src={good55} alt="" />
          <div>加价模板用于商品进价被改变时，同步调整销售价格。</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span style={{color:'#fff'}}>*</span>
            <div className={c.itemText}>商品名称</div>
          </div>
          <div>百度网盘共享会员7天</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span style={{color:'#fff'}}>*</span>
            <div className={c.itemText}>商品类别</div>
          </div>
          <div>百度网盘</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span style={{color:'#fff'}}>*</span>
            <div className={c.itemText}>卡密类型</div>
          </div>
          <div>循环卡</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span style={{color:'#fff'}}>*</span>
            <div className={c.itemText}>卡密状态</div>
          </div>
          <div style={{color:'#FF5F5F'}}>未售出</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span style={{color:'#fff'}}>*</span>
            <div className={c.itemText}>创建时间</div>
          </div>
          <div>2020.01.115 15:04:55</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span style={{color:'#fff'}}>*</span>
            <div className={c.itemText}>卡号</div>
          </div>
          <Input type="number" onChange={e=>{}} placeholder="" className={c.itemInput}></Input>
        </div>
        <div className={c.item}>
          <div className={c.itemName}>
            <span style={{color:'#fff'}}>*</span>
            <div className={c.itemText}>卡密</div>
          </div>
          <Input type="number" onChange={e=>{}} placeholder="" className={c.itemInput}></Input>
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

export default EditCardManView
