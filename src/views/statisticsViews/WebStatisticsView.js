import React, { useState, useEffect } from 'react'
import { TimelineChart } from 'ant-design-pro/lib/Charts';
import { Button, DatePicker, Radio, Table, Timeline } from 'antd'
import c from '../../styles/home.module.css'
import ct from '../../styles/statistics.module.css'

function WebStatisticsView () {
  const [views, setViews] = useState([])

  useEffect(() => {
    setViews(
      <TimelineChart title="销售额" height={466} data={chartData} titleMap={{ y1: '社区订单', y2: '卡密订单' }} />
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
              <div className={ct.title}>网站访问统计</div>
              <div className={ct.tips}>网站访问统计</div>
            </div>
            <div className={ct.data}>总计：2584.1548/245.1575</div>
          </div>
          <div className={ct.bView}>
            <div className={ct.bViewL}>
              <DatePicker.RangePicker className={ct.picker}/>
              <Button size="small" className={ct.btn}>确定</Button>
            </div>
          </div>
        </div>
        {views}
      </div>
    </div>
  )
}

export default WebStatisticsView
