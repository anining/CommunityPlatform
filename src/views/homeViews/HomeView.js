import React, { useState, useEffect } from 'react'
import { TimelineChart } from 'ant-design-pro/lib/Charts';
import { Button, Radio, Table, Timeline } from 'antd'
import c from '../../styles/home.module.css'
import home1 from '../../icons/home/home1.png'
import home2 from '../../icons/home/home2.png'
import home3 from '../../icons/home/home3.png'
import home4 from '../../icons/home/home4.png'
import home5 from '../../icons/home/home5.png'
import home6 from '../../icons/home/home6.png'
import home7 from '../../icons/home/home7.png'
import home8 from '../../icons/home/home8.png'
import home9 from '../../icons/home/home9.png'
import { h } from '../../utils/history'

function HomeView () {
  const [views, setViews] = useState([])
  const [views2, setViews2] = useState([])
  const [value3, setValue3] = useState('Apple')

  useEffect(() => {
    setViews(
      <TimelineChart title="订单数" height={316} data={chartData} titleMap={{ y1: '社区订单', y2: '卡密订单' }} />
    )
    setViews2(
      <TimelineChart title="充值/退款" height={316} data={chartData} titleMap={{ y1: '充值', y2: '退款' }} />
    )
  }, [])

  const options = [
    { label: '周数据', value: 'apple' },
    { label: '月数据', value: 'orange' },
  ];

  function onChange3 (e) {
    console.log('radio3 checked', e.target.value);
    setValue3(e.target.value)
  }

  const chartData = [];
  for (let i = 0; i < 20; i += 1) {
    chartData.push({
      x: new Date().getTime() + 1000 * 60 * 30 * i,
      y1: Math.floor(Math.random() * 100) + 1000,
      y2: Math.floor(Math.random() * 100) + 10,
    });
  }
  const obj = ["#FF4D4F", "#52C41A"]
  const columns = [
    {
      title: '商品ID',
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
        const { status, t } = text
        return <div style={{color:obj[status]}}>{t}</div>
      }
  },
    {
      title: '涨跌值',
      align: 'center',
      dataIndex: 'price',
      render: (text, record, index) => {
        const { status, t } = text
        return <div style={{color:obj[status]}}>{t}</div>
      }
  },
    {
      title: '创建时间',
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

  for (let i = 0; i < 100; i++) {
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

  return (
    <div className="container">
        <div className={c.header}>
          <img src={home8} alt="" className={c.avatar}/>
          <div className={c.headerU}>
            <div className={c.headerUN}>
              <div>欢迎您，想喝冰阔泺，祝您开心每一天！</div>
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
        {/* <div className={c.nullView}> */}
        {/*   <img src={home9} alt="" /> */}
        {/*   <div>暂无数据</div> */}
        {/*   <Button size="small" type="primary" className={c.nullBtn}>主页看板设置</Button> */}
        {/* </div> */}
        <div className={c.dataView}>
          <div className={c.orderViewL}>
            <div className={c.orderViewLT}>
              <div className={c.orderViewLTitle}>充值/退款数据</div>
              <Radio.Group
                options={options}
                onChange={onChange3}
                value={value3}
                optionType="button"
              />
            </div>
            {views2}
          </div>
          <div className={c.dataViewR}>
            <div className={c.dataViewRTitle}>数据统计</div>
            <div className={c.dataViewRMain}>
              <Rdata />
            </div>
          </div>
        </div>
        <div className={c.orderView}>
          <div className={c.orderViewL}>
            <div className={c.orderViewLT}>
              <div className={c.orderViewLTitle}>商品订单数据</div>
              <Radio.Group
                options={options}
                onChange={onChange3}
                value={value3}
                optionType="button"
              />
            </div>
            {views}
            </div>
          <div className={c.orderViewR}>
            <div className={c.orderViewRHeader}>
              <div className={c.orderViewRT}>最近动态</div>
              <div>更多</div>
            </div>
            <div className={c.time}>
              <Timeline>
                <Timeline.Item color="#2C68FF">2020.01.15 15:20:05　删除 订单(2548)</Timeline.Item>
                <Timeline.Item color="#979BA3">2020.01.15 15:20:05　修改余额65.1456 用户(154)</Timeline.Item>
                <Timeline.Item color="#979BA3">2020.01.15 15:20:05　修改余额65.1456 用户(154)</Timeline.Item>
                <Timeline.Item color="#979BA3">2020.01.15 15:20:05　修改余额65.1456 用户(154)</Timeline.Item>
                <Timeline.Item color="#979BA3">2020.01.15 15:20:05　修改余额65.1456 用户(154)</Timeline.Item>
                <Timeline.Item color="#979BA3">2020.01.15 15:20:05　修改余额65.1456 用户(154)</Timeline.Item>
                <Timeline.Item color="#979BA3">2020.01.15 15:20:05　修改余额65.1456 用户(154)</Timeline.Item>
                <Timeline.Item color="#979BA3">2020.01.15 15:20:05　修改余额65.1456 用户(154)</Timeline.Item>
                <Timeline.Item color="#979BA3">2020.01.15 15:20:05　修改余额65.1456 用户(154)</Timeline.Item>
              </Timeline>
            </div>
          </div>
        </div>
        <div className={c.tableView}>
          <div className={c.tableHeader}>
            <div className={c.tableTitle}>商品概况</div>
            <div className={c.tableTips}>查看全部</div>
          </div>
          <Table columns={columns} dataSource={data} rowClassName={(record,index)=>{
            if (index % 2) {
              return "f1f5ff"
            }
          }} size="small" pagination={{showQuickJumper:true}}
          />
        </div>
    </div>
  )
}

function Rdata () {
  const views = []
  const data = [
    {
      label: '待处理订单',
      number: '6,560',
      icon: home3,
      label1: '待处理订单',
      number1: '6,560',
      icon1: home6,
    },
    {
      label: '待处理订单',
      number: '6,560',
      icon: home2,
      label1: '待处理订单',
      number1: '6,560',
      icon1: home5,
    },
    {
      label: '待处理订单',
      number: '6,560',
      icon: home1,
      label1: '待处理订单',
      number1: '6,560',
      icon1: home4,
    },
  ]

  data.forEach((item, index) => {
    const { label, number, icon, label1, number1, icon1 } = item
    views.push(
      <div className={c.itemView}>
        <div className={c.dataItem}>
          <img src={icon} alt="" />
          <div className={c.dataItemR}>
            <div className={c.dataItemNum}>{number}</div>
            <div className={c.dataItemLabel}>{label}</div>
          </div>
        </div>
        <div className={c.dataItem}>
          <img src={icon1} alt="" />
          <div className={c.dataItemR}>
            <div className={c.dataItemNum}>{number1}</div>
            <div className={c.dataItemLabel}>{label1}</div>
          </div>
        </div>
      </div>
    )
  })

  return views
}

export default HomeView
