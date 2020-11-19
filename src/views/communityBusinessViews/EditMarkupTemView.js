import React, { useState } from 'react'
import c from '../../styles/edit.module.css'


import { Input, Radio, Button, Breadcrumb, message } from 'antd'
import good5 from '../../icons/good/good5.png'

import good55 from '../../icons/good/good55.png'
import good48 from '../../icons/good/good48.png'
import good47 from '../../icons/good/good47.png'
import good54 from '../../icons/good/good54.png'
import { saveSuccess,  push } from "../../utils/util"
import { useHistory } from "react-router-dom"
import { cmntPadjs } from "../../utils/api"

function EditMarkupTemView () {
  const h = useHistory()
  const { state = {} } = useHistory().location
  const { id,  params: p = []  } = state

  const [name, setName] = useState()
  const [type, setType] = useState("absolute")
  const [price, setPrice] = useState()
  const [factors, setFactors] = useState([])
  const [, setLoading] = useState(false)

  // const setPriceAt = i => R.pipe(
  //   e => L.set([i], +e.target.value, factors),
  //   setFactors,
  // )

	const setPriceAt = (e, i) => {
		const localFactors = [...factors]
		localFactors[i] = e.target.value
		setFactors(localFactors)
	}

  function save (jump) {
    if (!name) {
      message.warning("请完善信息")
      return
    }
    const localFactors = [...factors]
    if (localFactors.length !== 4) {
      for (let i = 0; i < 4; i++) {
        !localFactors[i] && (localFactors[i] = 0)
      }
    }
    setLoading(true)
    cmntPadjs(id ? 'modify' : 'add', id, undefined, { name, type, factors: localFactors }).then(r => {
      setLoading(false)
      if (!r.error) {
        saveSuccess(jump)
        setName(undefined)
        setType("absolute")
        setPrice()
        setFactors([])
      }
    }).catch(() => {
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
            <span onClick={()=>push("/main/markup-community")}>调价模版</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{id?"修改":"新增"}模版</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={c.main} style={{marginTop:24}}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>{id?"修改":"新增"}调价模版</div>
          <div className={c.circle} />
        </div>
        <div className={c.tem_header}>
          <img src={good55} alt="" />
          <div>调价模板用于商品进价被改变时，同步调整销售价格。</div>
        </div>
        <div className={c.item}>
          <div className={c.itemName} style={{width:'auto'}}>
            <span>*</span>
            <div className={c.itemText}>模版名称</div>
          </div>
          <Input maxLength={20} placeholder="请输入模版名称" onChange={e=>setName(e.target.value)} value={name} className={c.itemInput} />
        </div>
        <div className={c.item}>
          <div className={c.itemName} style={{width:'auto'}}>
            <span style={{color:'#fff'}}>*</span>
            <div className={c.itemText}>调价类型</div>
          </div>
          <Radio.Group className={c.itemGrop} onChange={e=>setType(e.target.value)} value={type} style={{justifyContent:'flex-start'}}>
            <Radio value="relative" className={c.itemRadio} style={{width:'33.333%'}}>百分比调价</Radio>
            <Radio value="absolute" className={c.itemRadio} style={{width:'33.333%'}}>固定调价</Radio>
          </Radio.Group>
        </div>
        <div className={c.item} style={{alignItems:'flex-start'}}>
          <div className={c.itemName} style={{width:'auto'}}>
            <span style={{color:'#fff'}}>*</span>
            <div className={c.itemText} style={{marginTop:9}}>调价配置</div>
          </div>
          <div>
            <div className={c.tem_line}>
              <div>&#8194; 假设商品进价为</div>
              <Input placeholder="0" value={price} onChange={e=>setPrice(e.target.value)}/>
            </div>
            <div className={c.tem_line}>
              <div>&#12288;&#12288;&#12288;&#8194; 单价调价</div>
							<Input placeholder="0" value={factors[0]} onChange={e=>setPriceAt(e,0)}/>
              <div>{type==="relative"?'% , ':', '}调价之后的单价为：</div>
              <span>{price?factors[0]?type==="absolute"?+price+ (+factors[0]):+price*(100+(+factors[0]))/100:price:factors[0]||0}</span>
            </div>
            <div className={c.tem_line}>
              <img src={good54} alt="" />
              <div>高级会员调价</div>
              <Input placeholder="0" value={factors[1] } onChange={e=>setPriceAt(e,1)}/>
              <div>{type==="relative"?'% , ':', '}调价之后的高级会员统一密价为：</div>
              <span>{price?factors[1]?type==="absolute"?+price+ (+factors[1]):+price*(100+(+factors[1]))/100:price:factors[1]||0}</span>
            </div>
            <div className={c.tem_line}>
              <img src={good48} alt="" />
              <div>钻石会员调价</div>
              <Input placeholder="0" value={factors[2] } onChange={e=>setPriceAt(e,2)}/>
              <div>{type==="relative"?'% , ':', '}调价之后的高级会员统一密价为：</div>
              <span>{price?factors[2]?type==="absolute"?+price+ (+factors[2]):+price*(100+(+factors[2]))/100:price:factors[2]||0}</span>
            </div>
            <div className={c.tem_line}>
              <img src={good47} alt="" />
              <div>至尊会员调价</div>
              <Input placeholder="0" value={factors[3] } onChange={e=>setPriceAt(e,3)}/>
              <div>{type==="relative"?'% , ':', '}调价之后的至尊会员统一密价为：</div>
              <span>{price?factors[3]?type==="absolute"?+price+ (+factors[3]):+price*(100+(+factors[3]))/100:price:factors[3]||0}</span>
            </div>
						{/* <div className={c.tem_tips}>{ true ? "*检测到至尊会员统一密价大于钻石会员统一密价，请确认是否填写错误。":null}</div> */}
          </div>
        </div>
        <div className={c.item} style={{marginTop:46}}>
          <div className={c.itemName}>
          </div>
          <div className={c.btnView}>
            <Button type="primary" className={c.submit} onClick={()=>save(true)}>保存调价模版</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditMarkupTemView
