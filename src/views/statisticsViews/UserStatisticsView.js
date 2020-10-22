import React, { useState, useEffect } from 'react'
import { Button, DatePicker } from 'antd'
import { Line } from '@ant-design/charts';
import c from '../../styles/home.module.css'
import ct from '../../styles/statistics.module.css'

function UserStatisticsView () {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const config = {
    height: 400,
    data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: { tickCount: 5 },
    slider: {
      start: 0.1,
      end: 0.5,
    },
    color: ['#2C68FF'],
  };

  return (
    <div className={c.main}>
      <div className={ct.orderView}>
          <div className={ct.title}>用户统计</div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div className={ct.tips}>统计新增用户</div>
            <div className={ct.data}>用户总数：245.1575</div>
          </div>
          <div className={ct.bViewL}>
            <DatePicker.RangePicker className={ct.picker}/>
            <Button size="small" className={ct.btn}>确定</Button>
          </div>
        <div className={ct.chart_label} style={{marginBottom:12}}>用户数</div>
        <Line {...config} />
      </div>
    </div>
  )
}

export default UserStatisticsView
