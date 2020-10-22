import React, { useState, useEffect } from 'react'
import { Line } from '@ant-design/charts';
import { Button, DatePicker } from 'antd'
import c from '../../styles/home.module.css'
import ct from '../../styles/statistics.module.css'

function WebStatisticsView () {
  const [data, setData] = useState([]);

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
    color: ['#2C68FF', '#2FC25B'],
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
        <div className={ct.title}>网站访问统计</div>
        <div className={ct.tips}>PV：页面浏览量(用户每访问一次主页就计算一次)；UV：页面独立访问量(每个用户每天只计算一次访问)。</div>
        <div className={ct.tips} style={{color:'#FF5730'}}>只采集店铺主页的访问数据。</div>
        <div className={ct.bViewL}>
          <DatePicker.RangePicker className={ct.picker}/>
          <Button size="small" className={ct.btn}>确定</Button>
        </div>
        <div className={ct.chart_label}>访问次数</div>
        <Line {...config} />
      </div>
    </div>
  )
}

export default WebStatisticsView
