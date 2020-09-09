import React, { useState } from 'react'
import { Button, Checkbox } from 'antd'
import c from '../../styles/guide.module.css'
import guide4 from '../../icons/guide/guide4.png'
import good5 from '../../icons/good/good5.png'
import guide5 from '../../icons/guide/guide5.png'
import guide6 from '../../icons/guide/guide6.png'
import guide7 from '../../icons/guide/guide7.png'
import guide8 from '../../icons/guide/guide8.png'
import guide9 from '../../icons/guide/guide9.png'
import guide10 from '../../icons/guide/guide10.png'
import guide11 from '../../icons/guide/guide11.png'
import guide12 from '../../icons/guide/guide12.png'
import guide13 from '../../icons/guide/guide13.png'
import guide14 from '../../icons/guide/guide14.png'
import guide15 from '../../icons/guide/guide15.png'
import guide17 from '../../icons/guide/guide17.png'
import { h } from '../../utils/history'
import ce from '../../styles/edit.module.css'

function DataSettingView () {

  function submit () {
    const history = h.get();
    history.push('/guide3')
  }

  return (
    <div className={ce.container}>
      <div className={ce.header}>
        <img src={good5} alt="" className={ce.headerImg}/>
        <div>首页 / 用户主页 / <span>主页看板设置</span></div>
      </div>
      <div className={ce.main}>
        <div className={ce.headerT}>
          <div style={{zIndex:1}}>主页仪表盘设置</div>
          <div className={ce.circle} />
        </div>
        <div style={{
          width:'100%',
          display:'flex',
          flexDirection:'column',
          alignItems:'flex-start',
          justifyContent:'space-between'
        }}>
          <div className={c.content}>
            <Context/>
          </div>
          <div style={{
            width:'100%',
            marginTop:80,
            display:'flex',
            flexDirection:'column',
            alignItems:'center'
          }}>
            <Button type="primary" onClick={submit} style={{
              height:40,
              width:320,
              fontSize:'1.142rem',
            }}>下一步</Button>
            <div style={{
              fontSize:'0.857rem',
              color:'#979BA3',
              marginTop:12
            }}>上次保存: 202.01.15 15:20:05</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Context () {
  const [selects, setSelects] = useState([])
  const views = [];
  const data = [
    {
      title: '基础功能',
      child: [
        {
          icon: guide10,
          label: '调价信息',
          text: '最近商品进价变化',
          id: 11
        },
        {
          icon: guide11,
          label: '调价信息',
          text: '最近商品进价变化',
          id: 12
        }
      ]
    },
    {
      title: '关键信息提示',
      child: [
        {
          icon: guide17,
          label: '操作待处理订单',
          text: '状态为“待处理”的订单',
          id: 21
        },
        {
          icon: guide8,
          label: '申请退款订单',
          text: '状态为“申请退款”的订单',
          id: 22
        },
        {
          icon: guide14,
          label: '申请补单订单',
          text: '状态为“申请补单”的订单 ',
          id: 23
        },
        {
          icon: guide6,
          label: '库存预警',
          text: '卡密不足的商品',
          id: 24
        },
        {
          icon: guide12,
          label: '异常订单',
          text: '状态为“异常”的订单',
          id: 25
        }
      ]
    },
    {
      title: '数据仪表盘',
      child: [
        {
          icon: guide4,
          label: '充值/退款',
          text: '充值/退款统计图',
          id: 31
        },
        {
          icon: guide8,
          label: '销售额',
          text: '销售额统计图 ',
          id: 32
        },
        {
          icon: guide13,
          label: '毛利',
          text: '毛利统计图',
          id: 33
        },
        {
          icon: guide15,
          label: '商品订单',
          text: '商品订单统计图 ',
          id: 34
        },
        {
          icon: guide7,
          label: '订单商品排行',
          text: '订单商品排行',
          id: 35
        },
        {
          icon: guide9,
          label: '用户',
          text: '用户统计图',
          id: 36
        },
        {
          icon: guide5,
          label: '站点统计',
          text: '网站PV/UV统计',
          id: 37
        }
      ]
    },
  ]

  function onChange (e, id) {
    const localSelects = [...selects]
    if (e.target.checked) {
      setSelects([...localSelects, id])
    } else {
      localSelects.splice(localSelects.findIndex(item => item === id), 1)
      setSelects(localSelects)
    }
  }

  data.forEach((item, index) => {
    const { child, title } = item;
    const childViews = [];
    child.forEach(i => {
      const { label, icon, text, id } = i;
      childViews.push(
        <div className={c.childItem} key={id} style={{
          borderColor: selects.includes(id) ? "#2C68FF" : "#D6D7DB"
        }}>
          <img src={icon} alt="" className={c.childImg}/>
          <div>
            <div className={c.childLabel}>{label}</div>
            <div className={c.childText}>{text}</div>
          </div>
          <Checkbox onChange={e=>onChange(e,id)} className={c.childBox}/>
        </div>
      )
    })

    views.push(
      <div className={c.secondItem} key={index}>
        <div className={c.secondTitle}>{title}</div>
        <div className={c.secondChildView}>
          {childViews}
        </div>
      </div>
    )
  });

  return (
    <div style={{width:'100%'}}>{views}</div>
  )
}

export default DataSettingView
