import * as React from 'karet'
import { useState, useEffect } from 'react'
import { Button, Table, Timeline } from 'antd'
import c from '../../styles/home.module.css'
import home3 from '../../icons/home/home3.png'
import home1 from '../../icons/home/home1.png'
import home4 from '../../icons/home/home4.png'
import home5 from '../../icons/home/home5.png'
import home7 from '../../icons/home/home7.png'
import home8 from '../../icons/home/home8.png'
import home9 from '../../icons/home/home9.png'
import { h } from '../../utils/history'
import { Line } from '@ant-design/charts';
import ct from '../../styles/statistics.module.css'
import { getter } from "../../utils/store";

function HomeView () {
  const { nickname } = getter(["nickname"])
  const obj = ["#FF4D4F", "#52C41A"]
  const columns = [
    {
      title: '商品ID',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '业务类型',
      dataIndex: 'id',
      align: 'center',
  },
    {
      title: '商品名称',
      dataIndex: 'name',
      align: 'center',
  },
    {
      title: '涨跌值',
      align: 'center',
      dataIndex: 'price',
      render: (text, record, index) => {
        return '-'
      }
      // render: (text, record, index) => {
      //   const { text: t, color } = getKey(text, obj)
      //   const { status, t } = text
      //   return <div style={}>{t}</div>
      // }
  },
    {
      title: '新的价格',
      align: 'center',
      dataIndex: 'price',
      render: (text, record, index) => {
        return '-'
      }
      // render: (text, record, index) => {
      //   const { text: t, color } = getKey(text, obj)
      //   const { status, t } = text
      //   return <div style={}>{t}</div>
      // }
  },
    {
      title: '变化时间',
      align: 'center',
      dataIndex: 'time',
  },
];

  const data = [
    {
      key: 1240,
      id: 11,
      name: '哔哩哔哩关注',
      price: {
        t: '-23.4%',
        status: 0,
      },
      time: '2017-10-31  23:12:00',
    },
    {
      key: 1240,
      id: 11,
      name: '哔哩哔哩关注',
      price: {
        t: '-23.4%',
        status: 1,
      },
      time: '2017-10-31  23:12:00',
    },
  ];
  const [recharge_data, setRechargeData] = useState([]);
  const [order_data, setOrderData] = useState([]);

  useEffect(() => {
    asyncFetch();
    orderAsyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
      .then((response) => response.json())
      .then((json) => setRechargeData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const orderAsyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
      .then((response) => response.json())
      .then((json) => setOrderData(json))
  };

  const config = {
    height: 400,
    data:recharge_data,
    padding: 'auto',
    xField: 'Date',
    yField: 'scales',
    xAxis: { tickCount: 5 },
    slider: {
      start: 0.1,
      end: 0.5,
    },
    color: '#2FC25B',
  };

  const orderConfig = {
    height: 400,
    data:order_data,
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
    xAxis: { type: 'time' },
    legend: { position: 'top-right' },
    yAxis: {
      tickCount: 9,
    },
    slider: {
      start: 0.1,
      end: 0.5,
    },
    color:['#2FC25B', '#FF8D30'],
  };

  for (let i = 0; i < 3; i++) {
    data.push({
      key: 1240,
      id: 11,
      name: '哔哩哔哩关注',
      price: {
        t: '-23.4%',
        status: 1,
      },
      time: '2017-10-31  23:12:00',
    })
  }

  const orders = [
    {
      label: '待处理订单',
      number: '6,560',
      icon: home3,
    },
    {
      label: '退款中订单',
      number: '6,560',
      icon: home1,
    },
    {
      label: '通信失败订单',
      number: '6,560',
      icon: home5,
    },
    {
      label: '库存预警',
      number: '6,560',
      icon: home4,
    },
  ]

  return (
    <div className="container">
        <div className={c.header}>
          <img src={home8} alt="" className={c.avatar}/>
          <div className={c.headerU}>
            <div className={c.headerUN}>
              <div>欢迎您，{nickname}，祝您开心每一天！</div>
              <div className={c.headerUNTips}>旗舰版</div>
            </div>
            <div className={c.headerUT}>到期时间：<div style={{color:'#34374A'}}>2021.01.01 01:15:23</div>　<span>续费</span></div>
          </div>
          <div className={c.line}/>
          <div className={c.headerL}>
            <div className={c.headerLTips}>上次登录信息</div>
            <div className={c.headerLPath}>127.0.0.1/重庆市</div>
            <div className={c.headerLTime}>2020.01.15 15:15:23</div>
          </div>
          <Button size="small" type="primary" className={c.headerBtn} onClick={()=>{
              const history = h.get()
              history.push("/main/dataSetting")
          }}>主页看板设置</Button>
          <img src={home7} alt="" className={c.headerBg}/>
        </div>

        <div className={c.message}>
          {
            orders.map((item, index) => {
              const { label, number, icon } = item
              return(
                <div className={c.order_item}>
                  <img src={icon} alt="" />
                  <div>{number}</div>
                  <span>{label}</span>
                </div>
              )
            })
          }
          <div className={c.moving}>
            <div className={c.moving_header}>
              <div>最近动态</div>
              <div>更多</div>
            </div>
            <div className={c.time}>
              <Timeline>
                <Timeline.Item color="#2C68FF">2020.01.15 15:20:05　删除 订单(2548)</Timeline.Item>
                <Timeline.Item color="#979BA3">2020.01.15 15:20:05　修改余额65.1456 用户(154)</Timeline.Item>
                <Timeline.Item color="#979BA3">2020.01.15 15:20:05　修改余额65.1456 用户(154)</Timeline.Item>
              </Timeline>
            </div>
          </div>
        </div>

        <div className={c.tableView}>
          <div className={c.tableHeader}>
            <div className={c.tableTitle}>最近进价变动表</div>
            <div className={c.tableTips}>查看全部</div>
          </div>
          <Table
            columns={columns}
            dataSource={data}
            size="small"
            pagination={false}
          />
        </div>
        <div className={ct.orderView} style={{marginTop: 24}}>
          <div className={ct.title}>充值</div>
          <div className={ct.chart_label} style={{marginBottom:12}}>充值数额</div>
          <Line {...config} />
        </div>
        <div className={ct.orderView} style={{marginTop: 24}}>
          <div className={ct.title}>商品订单统计</div>
          <div className={ct.chart_label} style={{marginBottom:12}}>订单数量</div>
          <Line {...orderConfig} />
        </div>
        {/* <div className={c.nullView}> */}
        {/*   <img src={home9} alt="" /> */}
        {/*   <div>暂无数据</div> */}
        {/*   <Button size="small" type="primary" className={c.nullBtn}>主页看板设置</Button> */}
        {/* </div> */}
    </div>
  )
}

export default HomeView
