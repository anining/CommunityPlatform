import React, { useState, useEffect } from 'react'
import c from '../../styles/edit.module.css'
import { Timeline, Breadcrumb } from 'antd'
import good5 from '../../icons/good/good5.png'
import header5 from '../../icons/header/header5.png'
import header6 from '../../icons/header/header6.png'
import header7 from '../../icons/header/header7.png'
import header8 from '../../icons/header/header8.png'
import edit23 from '../../icons/edit/edit23.png'
import { push,  transformTime, dateFormat } from "../../utils/util"
import { orderHis } from "../../utils/api"
import { useHistory } from "react-router-dom"

function OrderView () {
  const { state = {} } = useHistory().location
  const { id } = state
  const [orders, setOrders] = useState([])
  const [nums, setNums] = useState([
    {
      label: "订单差值",
      num: "10",
      background: "#FFF8F8",
			icon: header5
    },
    {
      label: "用户下单消耗",
      num: "125.1255",
      background: "#F8FAFF",
			icon: header8

    },
    {
      label: "您给用户退款",
      num: "12.1255",
      background: "#FFF9F1",
			icon: header6

    },
    {
      label: "上级给您退款",
      num: "25.1255",
      background: "#F3FDF6",
			icon: header7

    }
  ])

  useEffect(() => {
    get()
  }, [])

  function get () {
    orderHis(id).then(r => {
      !r.error && setOrders(r.data)
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
            <span onClick={()=>push("/main/communityOrder")}>社区订单</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>订单历程</Breadcrumb.Item>
        </Breadcrumb>
      </div>
			<div className={c.main} style={{marginTop:24}}>
        <div className={c.headerT}>
          <div style={{zIndex:1}}>订单历程</div>
          <div className={c.circle} />
        </div>
        <div className={c.orderHV}>
          <RHeader nums={nums}/>
        </div>
        <div className={c.orderM}>
          <div className={c.orderMH}>订单编号：{id}</div>
          <ROrder orders={orders}/>
        </div>
      </div>
    </div>
  )
}

function ROrder ({ orders }) {
  if (!orders.length) {
    return (
      <div className={c.orderNull}>
            <img src={edit23} alt="" />
            <div>暂无订单历程~</div>
          </div>
    )
  }

  return (
    <Timeline className={c.orderLineView}>
      <RLine orders={orders}/>
    </Timeline>
  )
}

function RLine ({ orders = [] }) {
  return orders.map((item, index) => {
    const { type, payload, created_at } = item
    let Msg
    switch( type ) {
      case "made": {
        const { user_account, user_id, goods_name, goods_id, cost } = payload
        Msg=<div>用户 {user_account} 下单<span> {goods_name} </span>(消耗<span style={{color:"#FF4D4F"}}> {cost} </span>)，订单状态变为 <span style={{color:"rgb(255, 141, 48)"}}>待处理</span>。</div>
      };break;
      case "pushed": {
        const { provider_name, provider_id, amount, cost } = payload
        Msg=<div>在 {provider_name} (供应商或对接/串货目标)下单成功，下单数量<span style={{color:"#FF4D4F"}}> {amount} </span>，消耗 <span style={{color:"#FF4D4F"}}> {cost} </span>，订单状态 <span style={{color:"rgb(255, 141, 48)"}}>待处理</span> => <span style={{color:"#2C68FF"}}>进行中</span>。</div>
      };break;
      case "push_closed": {
        const { provider_name, provider_id, reason } = payload
        Msg=<div>在 {provider_name} (供应商或对接/串货目标)下单失败，失败原因：<span>{ reason }</span>，订单状态 <span style={{color:"rgb(255, 141, 48)"}}>待处理</span> => <span style={{color:"#74C041"}}>已终止</span>。</div>
      };break;
      case "push_failed": {
        const { provider_name, provider_id, reason } = payload
        Msg=<div>在{ provider_name }(供应商或对接/串货目标)下单失败，失败原因：<span> {reason} </span> 您可以通过点击“重新推送”按钮来重新推送订单。</div>
      };break;
      case "repushed": {
        const { amount, cost, manager_nickname, manager_id } = payload
        Msg=<div>重新推送成功，下单数量 <span> {amount} </span>，消耗 <span>{cost}</span>，订单状态 <span style={{color:"rgb(255, 141, 48)"}}>待处理</span> => <span style={{color:"#2C68FF"}}>进行中</span>，操作人：<span>{manager_nickname}</span>。</div>
      };break;
      case "repush_closed": {
        const { reason, manager_nickname, manager_id } = payload
        Msg=<div>重新推送失败，失败原因：<span>{reason}</span>，订单状态 <span style={{color:"rgb(255, 141, 48)"}}>待处理</span> => <span style={{color:"#74C041"}}>已终止</span>。操作人：<span>{manager_nickname}</span>。</div>
      };break;
      case "repush_failed": {
        const { reason, manager_nickname, manager_id } = payload
        Msg=<div>重新推送失败，失败原因：<span>{reason}</span>操作人：<span>{manager_nickname}</span>。</div>
      };break;
      case "completed": {
        const { pass } = payload
        Msg=<div>订单完成，订单状态 <span style={{color:"#2C68FF"}}>进行中</span> => <span style={{color:"#74C041"}}>已完成</span>。</div>
      };break;
      case "closed": {
        const { reason, manager_nickname, manager_id } = payload
        Msg=<div>订单被终止，订单状态 <span style={{color:"#2C68FF"}}>进行中</span> => <span style={{color:"#74C041"}}>已终止</span>，终止原因：<span>{reason}</span>。</div>
      };break;
      case "refund_requested": {
        const { user_account, user_id } = payload
        Msg=<div>用户 {user_account} 发起退款申请，售后状态变为<span style={{color:'#74C041'}}> 退款中</span>。</div>
      };break;
      case "refunded": {
        const { provider_name, provider_id, amount, provider_refund_value, refund_value, closed } = payload
        Msg=<div><span>{provider_name} </span>退款给您，退款<span> {provider_refund_value} </span>(退款数量<span> {amount} </span>){ refund_value ? <>，您退款给用户(退款数量 <span>{refund_value}</span> )</> : "" }，售后状态 <span style={{color:'#74C041'}}>退款中</span> => <span style={{color:"#74C041"}}>已退款</span> { closed ? <>，订单状态 <span style={{color:"#2C68FF"}}>进行中</span> => <span style={{color:"#74C041"}}>已终止</span></>:"" }。</div>
        };break;
      case "refund_rejected": {
        const { provider_name, provider_id, reason } = payload
        Msg=<div>{provider_name} 拒绝退款，拒绝原因：<span> {reason}</span>。</div>
        };break;
      default:{
        const { amount, refund_value, closed } = payload
        Msg=<div>退款给用户，退款<span> {refund_value} </span>(退款数量 <span>{amount}</span>)，售后状态 <span style={{color:'#74C041'}}>退款中</span> => <span style={{color:"#74C041"}}> 已退款</span>{ closed? <>，订单状态 <span style={{color:"rgb(44, 104, 255)"}}>进行中</span> => <span style={{color:"#74C041"}}>已终止</span></> : '' }。</div>
      }
    }
    return (
      <Timeline.Item key={index} color="#1890FF" className={c.orderLine}>
        <div className={c.orderLineTime}>{ dateFormat(created_at) }</div>
        {Msg}
      </Timeline.Item>
    )
  })
}

function RHeader ({ nums }) {
  const views = []
  nums.forEach((item, i) => {
    const { label, background, icon, num } = item
    views.push(
      <div className={c.orderHI} style={{background}} key={i}>
				<img src={icon} alt=""/>
        <div>{num}</div>
        <span>{label}</span>
      </div>
    )
  })

  return views
}

export default OrderView
