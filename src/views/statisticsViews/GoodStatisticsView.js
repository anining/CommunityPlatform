import React, { useState, useEffect } from 'react'
import { TimelineChart } from 'ant-design-pro/lib/Charts';
import { GroupedColumn } from '@ant-design/charts';
import { Button, DatePicker, Radio, Table, Timeline } from 'antd'
import c from '../../styles/home.module.css'
import ct from '../../styles/statistics.module.css'

function GoodStatisticsView () {
  const [views, setViews] = useState([])
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/antfincdn/NXH9bWd4MU/subsales.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    height: 516,
    forceFit: true,
    description: {
      visible: true,
      text: '订单数',
    },
    data,
    xField: '城市',
    yField: '销售额',
    groupField: '细分',
    color: ['#1ca9e6', '#f88c24'],
    xAxis: {
      visible: true,
      label: {
        visible: true,
        autoHide: true,
      },
    },
    yAxis: {
      visible: true,
      title: {
        visible: false
      }
    },
    legend: {
      position: 'top-right'
    },
    interactions: [
      {
        type: 'slider',
        cfg: {
          start: 0.4,
          end: 0.42,
        },
      },
    ],
  };

  const salesData = [];
  for (let i = 0; i < 12; i += 1) {
    salesData.push({
      x: `${i + 1}月`,
      y1: Math.floor(Math.random() * 1000) + 200,
      y2: Math.floor(Math.random() * 1000) + 200,
    });
  }

  useEffect(() => {
    setViews(
      <TimelineChart title="充值/退款额" height={466} data={chartData} titleMap={{ y1: '社区订单', y2: '卡密订单' }} />
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
              <div className={ct.title}>商品订单统计</div>
              <div className={ct.tips}>商品订单统计</div>
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
      <div className={ct.orderView}>
        <div className={ct.orderLT}>
          <div className={ct.orderT}>
            <div>
              <div className={ct.title}>订单商品排行</div>
              <div className={ct.tips}>最热销的商品前10</div>
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
        <div className={ct.column}>
          <GroupedColumn {...config} />
        </div>
      </div>
    </div>
  )
}

export default GoodStatisticsView
