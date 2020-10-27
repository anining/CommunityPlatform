import React from 'react'
import c from '../../styles/edit.module.css'
import cs from '../../styles/business.module.css'
import statistics2 from '../../icons/edit/edit2.png'
import statistics4 from '../../icons/edit/edit4.png'
import statistics6 from '../../icons/edit/edit6.png'
import statistics8 from '../../icons/edit/edit8.png'
import statistics9 from '../../icons/edit/edit9.png'
import statistics10 from '../../icons/edit/edit10.png'
import statistics11 from '../../icons/edit/edit11.png'
import statistics12 from '../../icons/edit/edit12.png'
import statistics13 from '../../icons/edit/edit13.png'
import statistics15 from '../../icons/edit/edit15.png'
import statistics16 from '../../icons/edit/edit16.png'
import statistics17 from '../../icons/edit/edit17.png'
import statistics18 from '../../icons/edit/edit18.png'
import statistics19 from '../../icons/edit/edit19.png'
import statistics20 from '../../icons/edit/edit20.png'
import {message} from "antd"

function DataStatisticsView () {
  const views = []
  const data = [
    {
      title: '资金统计',
      child: [
        [
          {
            label: '今日下单额',
            num: '123,456',
            icon: statistics20
          },
          {
            label: '今日退单额',
            num: '123,456',
            icon: statistics17
          },
        ],
        [
          {
            label: '今日加款',
            num: '123,456',
            icon: statistics4
          },
        ],
        [
          {
            label: '今日减款',
            num: '123,456',
            icon: statistics6
          },
        ],
        [
          {
            label: '今日充值数额',
            num: '123,456',
            icon: statistics2
          },
        ],
      ]
    },
    {
      title: '商品&订单统计',
      child: [
        [
          {
            label: '订单总数',
            num: '123,456',
            icon: statistics8
          },
          {
            label: '今日订单',
            num: '123,456',
            icon: statistics10
          },
        ],
        [
          {
            label: '待处理订单',
            num: '123,456',
            icon: statistics11
          },
        ],
        [
          {
            label: '退款中订单',
            num: '123,456',
            icon: statistics13
          },
        ],
        [
          {
            label: '通信失败订单',
            num: '123,456',
            icon: statistics9
          },
        ],
        [
          {
            label: '库存预警商品',
            num: '123,456',
            icon: statistics12
          },
        ],
      ]
    },
    {
      title: '用户统计',
      child: [
        [
          {
            label: '用户总数',
            num: '123,456',
            icon: statistics19
          },
          {
            label: '今日新增',
            num: '123,456',
            icon: statistics18
          },
        ],
      ]
    },
    {
      title: '网站访问统计',
      child: [
        [
          {
            label: '今日主页PV',
            num: '123,456',
            icon: statistics15
          },
        ],
        [
          {
            label: '今日主页UV',
            num: '123,456',
            icon: statistics16
          },
        ],
      ]
    }
  ]

  data.forEach((item, index) => {
    const { title, child } = item
    views.push(
      <div className={c.headerT} key={index} style={{marginBottom:24}}>
        <div style={{zIndex:1}}>{title}</div>
        <div className={c.circle} />
      </div>
    )
    const items = []
    child.forEach((it, i) => {
      if (it.length === 1) {
        const { label, num, icon } = it[0]
        items.push(
          <div className={cs.bOIView}>
            <div className={cs.bIText}>
              <img src={icon} alt="" />
              <div className={cs.bLabel}>{label}</div>
            </div>
            <div className={cs.bNum}>¥{num}</div>
          </div>
        )
      } else {
        const { label, num, icon } = it[0]
        const { label: l, num: n, icon: ic } = it[1]
        items.push(
          <div className={cs.bTIView}>
            <div className={cs.bTIViewL}>
              <div className={cs.bIText}>
                <img src={icon} alt="" />
                <div className={cs.bLabel}>{label}</div>
              </div>
              <div className={cs.bNum}>¥{num}</div>
            </div>
            <div className={cs.bLine} />
            <div className={cs.bTIViewR}>
              <div className={cs.bIText}>
                <img src={ic} alt="" />
                <div className={cs.bLabel}>{l}</div>
              </div>
              <div className={cs.bNum}>¥{n}</div>
            </div>
          </div>
        )
      }
    })
    views.push(
      <div key={Math.random()} className={cs.bView}>
      {items}
      <div style={{cursor:'pointer'}} onClick={()=>message.warning("敬请期待!")} className={cs.bDetail}>查看详情</div>
      </div>
    )
  })

  return (
    <div className={c.container}>
      <div className={c.main}>
        {views}
      </div>
    </div>
  )
}

export default DataStatisticsView
