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

function EditMarkupTemView () {
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
            <span onClick={()=>push("/main/markupTem")}>加价模版</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{id?"修改":"新增"}模版</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={c.main} style={{marginTop:24}}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>{id?"修改":"新增"}加价模版</div>
          <div className={c.circle} />
        </div>
        <div className={c.tem_header}>
          <img src={good55} alt="" />
          <div>加价模板用于商品进价被改变时，同步调整销售价格。</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName} style={{width:'auto'}}>
            <span style={{color:'#fff'}}>*</span>
            <div className={c.itemText}>加价类型</div>
          </div>
          <Radio.Group className={c.itemGrop} style={{justifyContent:'flex-start'}}>
            <Radio value="normal" className={c.itemRadio} style={{width:'33.333%'}}>百分比加价</Radio>
            <Radio value="banned" className={c.itemRadio} style={{width:'33.333%'}}>固定加价</Radio>
          </Radio.Group>
        </div>
        <div className={c.item} style={{alignItems:'flex-start'}}>
          <div className={c.itemName} style={{width:'auto'}}>
            <span style={{color:'#fff'}}>*</span>
            <div className={c.itemText} style={{marginTop:9}}>加价配置</div>
          </div>
          <div>
            <div className={c.tem_line}>
              <div>&#8194;假设商品进价为</div>
              <Input placeholder="1"/>
            </div>
            <div className={c.tem_line}>
              <div>&#12288;&#12288;&#12288;&#8194;单价加价</div>
              <Input placeholder="10"/>
              <div>加价之后的单价为：</div>
              <span>6</span>
            </div>
            <div className={c.tem_line}>
              <img src={good54} alt="" />
              <div>高级会员加价</div>
              <Input placeholder="10" />
              <div>加价之后的高级会员统一密价为：</div>
              <span>4.5</span>
            </div>
            <div className={c.tem_line}>
              <img src={good48} alt="" />
              <div>钻石会员加价</div>
              <Input placeholder="10"/>
              <div>%，加价之后的高级会员统一密价为：</div>
              <span>6</span>
            </div>
            <div className={c.tem_line}>
              <img src={good47} alt="" />
              <div>至尊会员加价</div>
              <Input placeholder="10"/>
              <div>%，加价之后的至尊会员统一密价为：</div>
              <span>6</span>
            </div>
            <div className={c.tem_tips}>*检测到至尊会员统一密价大于钻石会员统一密价，请确认是否填写错误。</div>
          </div>
        </div>
        <div className={c.item} style={{marginTop:46}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button loading={loading} type="primary" className={c.submit} onClick={()=>save(true)}>保存加价模版</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditMarkupTemView
