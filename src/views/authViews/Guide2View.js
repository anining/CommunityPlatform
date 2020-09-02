import React, { useState } from 'react'
import { Button, Checkbox } from 'antd'
import c from '../../styles/guide.module.css'
import guide4 from '../../icons/guide/guide4.png'
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

function Guide2View () {

  function submit () {
    const history = h.get();
    history.push('/guide3')
  }

  return (
    <div className={c.container}>
      <div className={c.view}>
      <Title/>
      <div className={c.content}>
        <Context/>
      </div>
      <div className={c.footer}>
        <Button type="primary" className={c.btn} onClick={submit}>下一步</Button>
        <div className={c.footerText} onClick={()=>{
          const history = h.get()
          history.push('/main')
        }}>稍后设置</div>
        <Circle/>
      </div>
      </div>
    </div>
  )
}

function Title () {

  return (
    <div className={c.text}>
      <div className={c.title}>自定义首页仪表盘</div>
      <div className={c.minTitle}>定制首页仪表盘信息，只展示你关注的数据。</div>
      <div>您可以在“系统设置 - 首页仪表盘”来修改这些信息。</div>
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
    <div className={c.secondView}>{views}</div>
  )
}

function Circle () {
  const views = [];
  [0, 1, 2, 3].forEach((item, index) => {
    views.push(
      <div style={{
        height: 8,
        width: 8,
        marginLeft: 4,
        marginRight: 4,
        borderRadius: 8,
        background: index!==1?'#D6D7DB':'#2C67FF'
      }} key={index}/>
    )
  })

  return <div className={c.circleView}>{views}</div>
}

export default Guide2View
