import React, { useState, useEffect } from 'react'
import { TimelineChart } from 'ant-design-pro/lib/Charts';
import { Button, DatePicker, Radio, Table, Timeline } from 'antd'
import c from '../../styles/home.module.css'
import ct from '../../styles/statistics.module.css'

function MoneyStatisticsView () {
  const [views, setViews] = useState([])
  const [views2, setViews2] = useState([])
  const [views3, setViews3] = useState([])

  useEffect(() => {
    setViews(
      <TimelineChart title="销售额" height={466} data={chartData} titleMap={{ y1: '社区订单', y2: '卡密订单' }} />
    )
    setViews2(
      <TimelineChart title="充值/退款额" height={466} data={chartData} titleMap={{ y1: '充值', y2: '退款' }} />
    )
    setViews3(
      <TimelineChart title="毛利值" height={466} data={chartData} titleMap={{ y1: '充值', y2: '退款' }} />
    )
  }, [])

  const chartData = [];
  for (let i = 0; i < 20; i += 1) {
    chartData.push({
      x: new Date().getTime() + 1000 * 60 * 30 * i,
      y1: Math.floor(Math.random() * 100) + 1000,
      y2: Math.floor(Math.random() * 100) + 10,
    });
  }

  return (
    <div className={c.main}>
      <div className={ct.orderView}>
        <div className={ct.orderLT}>
          <div className={ct.orderT}>
            <div>
              <div className={ct.title}>充值/退款</div>
              <div className={ct.tips}>统计充值记录</div>
            </div>
            <div className={ct.data}>总计：2584.1548/245.1575</div>
          </div>
          <div className={ct.bView}>
            <DatePicker.RangePicker className={ct.picker}/>
            <Button size="small" className={ct.btn}>确定</Button>
          </div>
        </div>
        {views2}
      </div>
      <div className={ct.orderView} style={{marginTop:24}}>
        <div className={ct.orderLT}>
          <div className={ct.orderT}>
            <div>
              <div className={ct.title}>销售额统计</div>
              <div className={ct.tips}>统计平台销售额，销售额 = 下单总额 - 退款额</div>
            </div>
            <div className={ct.data}>总计：2584.1548/245.1575</div>
          </div>
          <div className={ct.bView}>
            <DatePicker.RangePicker className={ct.picker}/>
            <Button size="small" className={ct.btn}>确定</Button>
          </div>
        </div>
        {views}
      </div>
      <div className={ct.orderView} style={{marginTop:24}}>
        <div className={ct.orderLT}>
          <div className={ct.orderT}>
            <div>
              <div className={ct.title}>毛利统计</div>
              <div className={ct.tips}>统计平台毛利，只有配置了商品的进价才能正常统计毛利。毛利 = 售价 - 进价</div>
            </div>
            <div className={ct.data}>总计：2584.1548/245.1575</div>
          </div>
          <div className={ct.bView}>
            <DatePicker.RangePicker className={ct.picker}/>
            <Button size="small" className={ct.btn}>确定</Button>
          </div>
        </div>
        {views3}
      </div>
    </div>
  )
}

export default MoneyStatisticsView
