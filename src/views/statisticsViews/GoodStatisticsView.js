import React, { useState, useEffect } from 'react'
import { Line,Rose } from '@ant-design/charts';
// import { GroupedColumn } from '@ant-design/charts';
import { Button, DatePicker } from 'antd'
import c from '../../styles/home.module.css'
import ct from '../../styles/statistics.module.css'

function GoodStatisticsView () {
  const [data, setData] = useState([]);
  const salesData = [
    {
      type: '音符评论',
      value: 1500,
    },
    {
      type: 'B站关注',
      value: 1800,
    },
    {
      type: 'B赞评论',
      value: 1000,
    },
    {
      type: 'B站点赞',
      value: 2200,
    },
    {
      type: 'B站收藏',
      value: 3000,
    },
    {
      type: 'B站分享',
      value: 500,
    },
    {
      type: '其他订单',
      value: 3000,
    },
    {
      type: '音符关注',
      value: 1000,
    },
    {
      type: '音符点赞',
      value: 1991,
    },
  ];

  const salesConfig = {
    height: 400,
    data: salesData,
    xField: 'type',
    yField: 'value',
    seriesField: 'type',
    radius: 0.9,
    legend: { position: 'right' },
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
      .then((response) => response.json())
      .then((json) => setData(json))
  };

  const config = {
    height: 400,
    data,
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
    xAxis: { type: 'time' },
    legend: { position: 'top-right' },
    color: ['#2FC25B', '#FF8D30'],
    yAxis: {
      tickCount: 9,
    },
    slider: {
      start: 0.1,
      end: 0.5,
    },
  };

  return (
    <div className={c.main}>
      <div className={ct.orderView}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div className={ct.title}>订单统计</div>
            <div className={ct.data}>社区订单数量：245.1575</div>
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div className={ct.tips}>用户下单统计</div>
            <div className={ct.data}>卡密订单数量：245.1575</div>
          </div>
          <div className={ct.bViewL}>
            <DatePicker.RangePicker className={ct.picker}/>
            <Button size="small" className={ct.btn}>确定</Button>
          </div>
        <div className={ct.chart_label} style={{marginBottom:12}}>充值/退款额</div>
        <Line {...config} />
      </div>
      <div className={ct.orderView} style={{marginTop:24}}>
        <div className={ct.title}>社区商品销售排行</div>
        <div className={ct.tips}>用户下单次数最多的社区业务商品，以及占全部订单的比；默认统计最近7天排行前10的数据。</div>
        <div className={ct.bViewL}>
          <DatePicker.RangePicker className={ct.picker}/>
          <Button size="small" className={ct.btn}>确定</Button>
        </div>
        <Rose {...salesConfig} />
      </div>
      <div className={ct.orderView} style={{marginTop:24}}>
        <div className={ct.title}>卡密商品销售排行</div>
        <div className={ct.tips}>用户下单次数最多的卡密业务商品，以及占全部订单的比；默认统计最近7天排行前10的数据。</div>
        <div className={ct.bViewL}>
          <DatePicker.RangePicker className={ct.picker}/>
          <Button size="small" className={ct.btn}>确定</Button>
        </div>
        <Rose {...salesConfig} />
      </div>
    </div>
  )
}

export default GoodStatisticsView
