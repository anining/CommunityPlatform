import React, { useState, useEffect } from 'react'
import { Line } from '@ant-design/charts';
import { Button, DatePicker } from 'antd'
import c from '../../styles/home.module.css'
import ct from '../../styles/statistics.module.css'

function MoneyStatisticsView () {
  const [data, setData] = useState([]);
  const [order_data, setOrderData] = useState([]);

  useEffect(() => {
    asyncFetch();
    asyncFetchOrder();
  }, []);

  const asyncFetchOrder = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/c48dbbb1-fccf-4a46-b68f-a3ddb4908b68.json')
      .then((response) => response.json())
      .then((json) => setOrderData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

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
    xField: 'Date',
    yField: 'scales',
    xAxis: { tickCount: 5 },
    slider: {
      start: 0.1,
      end: 0.5,
    },
    color:"#2FC25B",
  };

  const configOrder = {
    height:400,
    data:order_data,
    xField: 'date',
    yField: 'value',
    yAxis: { label: { formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`) } },
    seriesField: 'type',
    legend: { position: 'top-right' },
    color: ["#52C41A", "#FF4D4F"],
    slider: {
      start: 0.1,
      end: 0.5,
    },
  };

  return (
    <div className={c.main}>
      <div className={ct.orderView}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div className={ct.title}>充值</div>
          <div className={ct.data}>总计充值数额：2584.1548/245.1575</div>
        </div>
        <div className={ct.tips}>用户充值统计</div>
        <div className={ct.bViewL}>
          <DatePicker.RangePicker className={ct.mPicker}/>
          <Button size="small" className={ct.btn}>确定</Button>
        </div>
        <div className={ct.chart_label} style={{marginBottom:12}}>充值/退款额</div>
        <Line {...config} />
      </div>
      <div className={ct.orderView} style={{marginTop:24}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div className={ct.title}>下单数额/退单数额</div>
          <div className={ct.data}>下单数额：245.157</div>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{width:'100%'}}>
            <div className={ct.tips}>用户下单数额和退单数额统计；统计的数据依照下单/退单成功的时间计算。</div>
            <div className={ct.tips}>下单数额 = 订单对应商品下单时的单价 * 下单数量 * 时间区间内订单数量；订单对应商品下单时的单价 * 退单数量 * 时间区间内订单数量。</div>
          </div>
          <div className={ct.data}>退单数额：245.157</div>
        </div>
        <div className={ct.bViewL}>
          <DatePicker.RangePicker className={ct.mPicker}/>
          <Button size="small" className={ct.btn}>确定</Button>
        </div>
        <div className={ct.chart_label} style={{marginBottom:12}}>数量</div>
        <Line {...configOrder} />
      </div>
      <div className={ct.orderView} style={{marginTop:24}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div className={ct.title}>系统加款/系统减款</div>
          <div className={ct.data}>系统加款：245.157</div>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div className={ct.tips}>管理后台为用户加款/减款的数据统计</div>
          <div className={ct.data}>系统减款：245.157</div>
        </div>
        <div className={ct.bViewL}>
          <DatePicker.RangePicker className={ct.mPicker}/>
          <Button size="small" className={ct.btn}>确定</Button>
        </div>
        <div className={ct.chart_label}>数量</div>
        <Line {...configOrder} />
      </div>
    </div>
  )
}

export default MoneyStatisticsView
